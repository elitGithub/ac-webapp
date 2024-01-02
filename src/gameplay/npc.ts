import { Sprite } from "pixi.js";
import { BaseCharacter } from "../engine/coreentities/basecharacter";
import { EngineBus, IEngineEvent, createEngineEvent, getEngine } from "../engine";
import { vec2 } from "../core/math/models";
import { queueNamedAnimate } from "../engine/rendereffects";
import SceneTransitionFlags from "../engine/scene/models/scenetransitions";
import { Animation, AnimationListener, PremadeAnimations } from "../engine/rendereffects/models";
import { START_DIALOGUE } from "./dialogue";
import { DialogueMode } from "./dialogue/model";
import { BaseInteractable } from "../engine/coreentities";

enum BodyPart {
    BODY,
    FACE,
    TORSO,
    ARMS,
    LEGS
}

function getBodyPartOffset(bodyPart: BodyPart): vec2 {
    switch (bodyPart) {
        case BodyPart.BODY:
            return { x: 0, y: 0 };
        case BodyPart.FACE:
            return getEngine().SPR(0.06, 0.11);
        case BodyPart.TORSO:
            return { x: 0, y: 0 };
        case BodyPart.ARMS:
            return getEngine().SPR(-0.04, 0.265);
        case BodyPart.LEGS:
            return { x: 0, y: 0 };
        default:
            return { x: 0, y: 0 };
    }
}

//add scheduling
export class NPC extends BaseCharacter implements AnimationListener, DialogueMode {
    assetsBase: string;
    manifest: Object;
    availableExpressions = ["afraid", "angry", "annoyed", "blush", "concerned", "confident", "cringe",
        "displeased", "embarrassed", "excited", "eyeroll", "flirty", "laughing", "neutral", "sad",
        "sarcastic", "skeptical", "smile", "thinking", "worried"];
    expressions: Map<string, Sprite>;
    body: Map<string, Sprite>;
    arms: Map<string, Sprite>;
    bodyPartOverrides: Map<string, {position: vec2|undefined}>;
    transitioning: boolean;
    transitioningTo: string;
    currentExpression: string;
    currentBody: string;
    currentArms: string;

    inDialogueMode: boolean;

    worldRepresentatives: BaseInteractable[];

    constructor(displayName: string, assetsBase: string ="/src/assets/characters") {
        super(displayName);
        this.assetsBase = assetsBase;
        this.manifest = new Object();
        this.expressions = new Map<string, Sprite>();
        this.body = new Map<string, Sprite>();
        this.arms = new Map<string, Sprite>();
        this.transitioning = false;
        this.transitioningTo = "";
        this.bodyPartOverrides = new Map<string, any>();
        this.inDialogueMode = false;
        this.currentExpression = "";
        this.currentBody = "";
        this.currentArms = "";
        this.worldRepresentatives = [];

        this.parseBaseAssets().then(() => {
            this.currentBody = "body1";
            this.currentExpression = "neutral";
            this.currentArms = "b1arm1_n";
            const defaultBody = this.body.get(this.currentBody);
            const defaultExpression = this.expressions.get(this.currentExpression);
            const defaultArms = this.arms.get(this.currentArms);
            if (defaultBody) {
                this.addChildAt(defaultBody, BodyPart.BODY);
            }
            if (defaultExpression) {
                const pos = getBodyPartOffset(BodyPart.FACE);
                defaultExpression.setTransform(pos.x, pos.y);
                this.addChildAt(defaultExpression, BodyPart.FACE);
            }
            if (defaultArms) {
                const pos = getBodyPartOffset(BodyPart.ARMS);
                defaultArms.setTransform(pos.x, pos.y);
                this.addChildAt(defaultArms, BodyPart.ARMS);
            }
        });

        getEngine().getAnimation().subscribeToAnimationEvents(this);
    }

    setSpeaking(speaking: boolean): void {
        if (!speaking) {
            this.exitDialogueMode();
        }

        this.speaking = speaking;
    }
    
    enterDialogueMode(): void {
        for (const rep of this.worldRepresentatives) {
            queueNamedAnimate(rep, PremadeAnimations.FADE_OUT, 250);
        }
        queueNamedAnimate(this, PremadeAnimations.FADE_IN, 500);
        this.transitioning = true;
        this.transitioningTo = this.availableExpressions[Math.round(Math.random() * this.availableExpressions.length) - 1];
        //EngineBus.emit(START_DIALOGUE, createEngineEvent(START_DIALOGUE, {dialogueId: "test_dialogue"}));
        this.inDialogueMode = true;
    }

    exitDialogueMode(): void {
        this.inDialogueMode = false;
        for (const rep of this.worldRepresentatives) {
            queueNamedAnimate(rep, PremadeAnimations.FADE_IN, 250);
        }
    }

    setDialogueState() {
        this.scale.set(1,1);
    }

    addWorldRep(rep: BaseInteractable) {
        if (this.worldRepresentatives.includes(rep)) {
            return;
        }
        this.worldRepresentatives.push(rep);
    }

    removeWorldRep(rep: BaseInteractable) {
        this.worldRepresentatives = this.worldRepresentatives.filter(r => r !== rep);
    }

    private findAssets(regexp: string|RegExp, store: Object) {
        const matchingAssets: {name: string, path: string}[] = [];
        for (const key of Object.keys(store)) {
            if (typeof store[key] === "object") {
                matchingAssets.push(...this.findAssets(regexp, store[key]));
            }
            else if (key.match(regexp)) {
                matchingAssets.push({name: key.split(".")[0], path: store[key]});
            }
        }

        return matchingAssets;
    }

    private async parseBaseAssets() {
        const manifest = await getEngine().getAssets().load({source: `${this.assetsBase}/${this.name.toLowerCase()}/manifest.json`});
        this.manifest = manifest?.data;
        const armRegex = /b(\d)arm(\d)|_(\w*)/;
        const possibleArms = this.findAssets(armRegex, this.manifest);
        for (const arm of possibleArms) {
            const armResource = await getEngine().getAssets().loadTexture({ source: `${this.assetsBase}/${this.name.toLowerCase()}${arm.path}` });
            const armSprite = new Sprite(armResource?.texture);
            armSprite.name = arm.name;
            this.arms.set(arm.name, armSprite);
        }

        const bodyRegex = /body(\d)/;
        const possibleBodies = this.findAssets(bodyRegex, this.manifest);
        for (const body of possibleBodies) {
            const bodyResource = await getEngine().getAssets().loadTexture({ source: `${this.assetsBase}/${this.name.toLowerCase()}${body.path}` });
            const bodySprite = new Sprite(bodyResource?.texture);
            bodySprite.name = body.name;
            this.body.set(body.name, bodySprite);
        }

        for (const e of this.availableExpressions) {
            const faceResource = await getEngine().getAssets().loadTexture({ source: `${this.assetsBase}/${this.name.toLowerCase()}/avatar/face_${e}.webp` });
            const expressionSprite = new Sprite(faceResource?.texture);
            expressionSprite.name = e;
            this.expressions.set(e, expressionSprite);
        }

    }

    private setBodyPart(sprite: Sprite, part: BodyPart) {
        this.removeChildAt(part);
        this.addChildAt(sprite, part);
        switch(part) {
            case BodyPart.FACE:
                if (sprite.name && this.bodyPartOverrides.has("face_"+sprite.name)) {
                    const override = this.bodyPartOverrides.get("face_"+sprite.name);
                    if (override && override.position) {
                        sprite.setTransform(override.position.x, override.position.y);
                    }
                }
                break;
            case BodyPart.BODY:
            case BodyPart.TORSO:
            case BodyPart.ARMS:
            case BodyPart.LEGS:
                if (sprite.name && this.bodyPartOverrides.has(sprite.name)) {
                    const override = this.bodyPartOverrides.get(sprite.name);
                    if (override && override.position) {
                        sprite.setTransform(override.position.x, override.position.y);
                    }
                }
                break;
        }
    }

    changeExpression(expression: string) {
        if (this.expressions.has(expression.toLowerCase())) {
            this.currentExpression = expression;
            const pos = getBodyPartOffset(BodyPart.FACE);
            const face = this.expressions.get(this.currentExpression)!;
            face.setTransform(pos.x, pos.y);
            this.setBodyPart(face, BodyPart.FACE);
        }
    }

    changeBody(type: number) {
        if (type <= 4 && type > 0) {
            this.currentBody = `body${type}`;
            this.currentArms = `body${type}-arm1`;
            const body = this.body.get(this.currentBody)!;
            const arms = this.arms.get(this.currentArms)!;
            const pos = getBodyPartOffset(BodyPart.ARMS);
            arms.setTransform(pos.x, pos.y);
            this.setBodyPart(body, BodyPart.BODY);
            this.setBodyPart(arms, BodyPart.ARMS);
        }
    }

    setBody(nameOfAsset: string) {
        if (!this.body.has(nameOfAsset)) {
            const matches = this.findAssets(nameOfAsset, this.manifest);
            if (matches.length === 0) {
                return;
            }
            
            getEngine().getAssets().loadTexture({ source: `${this.assetsBase}/${this.name.toLowerCase()}${matches[0].path}` })
            .then(asset => {
                const body = new Sprite(asset.texture);
                this.body.set(matches[0].name, body);
                this.setBodyPart(body, BodyPart.BODY);
            });
        }
        else {
            this.setBodyPart(this.body.get(nameOfAsset)!, BodyPart.BODY);
        }
    }

    setArms(nameOfAsset: string) {
        if (!this.arms.has(nameOfAsset)) {
            const matches = this.findAssets(nameOfAsset, this.manifest);
            if (matches.length === 0) {
                return;
            }
            
            getEngine().getAssets().loadTexture({ source: `${this.assetsBase}/${this.name.toLowerCase()}${matches[0].path}` })
            .then(asset => {
                const arm = new Sprite(asset.texture);
                this.arms.set(matches[0].name, arm);
                this.setBodyPart(arm, BodyPart.ARMS);
            });
        }
        else {
            this.setBodyPart(this.arms.get(nameOfAsset)!, BodyPart.ARMS);
        }
    }

    addBodyPartOverride(bodyPart: string, offset?: vec2) {
        this.bodyPartOverrides.set(bodyPart, {position: offset});
    }

    onAnimationsFinish(animation: Animation) {
        /*if (this.transitioning && animation.target === this) {
            if (this.transitioningTo) {
                this.changeExpression(this.transitioningTo);
                this.transitioningTo = "";
                queueNamedAnimate(this, PremadeAnimations.FADE_OUT, 500);
                if (this.inDialogueMode) {
                    this.setDialogueState();
                }
            }
            else {
                this.transitioning = false;
            }
        }*/
    }
}

export class WorldNPC extends BaseInteractable {

    npc?: NPC;
    npcName: string;
    constructor(displayName: string, npc?: NPC) {
        super(undefined, "world_"+displayName);
        this.addAction({action: "interact", handler: this.enterDialogue.bind(this)});
        this.npcName = displayName;
        this.npc = npc;
        this.npc?.addWorldRep(this);
    }

    enterDialogue() {
        if (!this.npc) {
            const npc: NPC|undefined = getEngine().getGame().gameEntities.find(ent => ent.name === this.npcName) as NPC;
            if (!npc) {
                return;
            }

            npc.addWorldRep(this);
            npc.enterDialogueMode();
        }
        else {
            this.npc.enterDialogueMode();
        }
    }

}