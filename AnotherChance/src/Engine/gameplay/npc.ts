import { BaseTexture, Sprite, Texture, settings } from "pixi.js";
import { BaseCharacter } from "../engine/coreentities/basecharacter";
import { getEngine } from "../engine";
import { vec2 } from "../core/math/models";
import { queueNamedAnimate } from "../engine/rendereffects";
import { Animation, AnimationListener, PremadeAnimations } from "../engine/rendereffects";
import { DialogueMode } from "./dialogue";
import { BaseInteractable } from "../engine/coreentities";
import { IRenderableResource } from "../framework/graphics";

export enum BodyPart {
    BODY,
    FACE,
    ARMS,
    LEGS
}

export type RunPose = (npc: NPC) => void;

function getBodyPartOffset(bodyPart: BodyPart): vec2 {
    switch (bodyPart) {
        case BodyPart.BODY:
            return { x: 110, y: 124 };
        case BodyPart.FACE:
            return {x: 226, y: 239};
        case BodyPart.ARMS:
            return {x: 34,y: 245};
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
    availableExpressions: string[];
    expressions: Map<string, Sprite>;
    body: Map<string, Sprite>;
    arms: Map<string, Sprite>;
    bodyPartOverrides: Map<string, {position: vec2|undefined}>;
    runPoses: Map<string, RunPose>;
    transitioning: boolean;
    transitioningTo: string;
    currentExpression: string;
    currentBody: string;
    currentArms: string;
    speakerLabel?: Sprite;

    buildMode: boolean;
    buildCache: Map<string, Sprite>;

    defaultPosition: vec2;
    defaultSize: vec2;
    inDialogueMode: boolean;

    worldRepresentatives: BaseInteractable[];

    // TODO: move this into a dynamic loader as well.
    constructor(displayName: string, assetsBase: string ="AnotherChance/public/assets/images") {
        super(displayName);
        this.assetsBase = assetsBase;
        this.manifest = {};
        this.availableExpressions = [];
        this.expressions = new Map<string, Sprite>();
        this.body = new Map<string, Sprite>();
        this.arms = new Map<string, Sprite>();
        this.runPoses = new Map<string, RunPose>();
        this.transitioning = false;
        this.transitioningTo = "";
        this.bodyPartOverrides = new Map<string, any>();
        const pos = getEngine().getRender().getDimensions();
        this.defaultPosition = {x: pos.x/2, y: 0};
        this.defaultSize = {x: 0, y: 0};
        this.inDialogueMode = false;
        this.currentExpression = "";
        this.currentBody = "";
        this.currentArms = "";
        this.buildMode = false;
        this.buildCache = new Map<string, Sprite>();
        this.worldRepresentatives = [];

        this.parseBaseAssets().then(() => {
            this.currentBody = "body1";
            this.currentExpression = "face_neutral";
            this.currentArms = "b1arm1_n";
            const defaultBody = this.body.get(this.currentBody);
            const defaultExpression = this.expressions.get(this.currentExpression);
            const defaultArms = this.arms.get(this.currentArms);
            if (defaultBody) {
                this.setBodyPart(defaultBody, BodyPart.BODY);
                this.setDefaultSize(defaultBody.width, defaultBody.height);
            }
            if (defaultExpression) {
                this.setBodyPart(defaultExpression, BodyPart.FACE);
            }
            if (defaultArms) {
                this.setBodyPart(defaultArms, BodyPart.ARMS);
            }
        });

        getEngine().createSimpleSprite({source: `${this.assetsBase}/ui/dialog/frame_name_${this.name.toLowerCase()}.webp`})
        .then(sprite => {
            if (sprite) {
                this.speakerLabel = sprite;
            }
        })
        getEngine().getAnimation().subscribeToAnimationEvents(this);
    }

    setSpeaking(speaking: boolean): void {
        if (!speaking) {
            this.exitDialogueMode();
        }

        this.speaking = speaking;
    }

    setDefaultPosition(x: number, y: number) {
        this.defaultPosition = {x, y};
    }

    setDefaultSize(x: number, y: number) {
       const canvas = settings.ADAPTER.createCanvas(x, y);
       const context = canvas.getContext('2d');

       canvas.width = x;
       canvas.height = y;
       context!.fillStyle = `rgba(
        0,
        0,
        0,
        0)`;
       context!.fillRect(0, 0, x, y);
       this.texture = new Texture(BaseTexture.from(canvas));
    }

    setSize(x: number, y: number) {
        this.width = x;
        this.height = y;
    }

    enterDialogueMode(): void {
        for (const rep of this.worldRepresentatives) {
            queueNamedAnimate(rep, PremadeAnimations.FADE_OUT, 250);
            rep.canInteract = false;
        }
        getEngine().getScene().getCurrentScene()?.addSceneObject(this);
        this.position.set(this.defaultPosition.x, this.defaultPosition.y);
        this.resetOrientation();
        this.changeExpression("face_neutral");
        this.alpha = 0;
        queueNamedAnimate(this, PremadeAnimations.FADE_IN, 500);
        this.transitioning = true;
        this.transitioningTo = this.availableExpressions[Math.round(Math.random() * this.availableExpressions.length) - 1];
        this.inDialogueMode = true;
    }

    exitDialogueMode(): void {
        this.inDialogueMode = false;
        for (const rep of this.worldRepresentatives) {
            queueNamedAnimate(rep, PremadeAnimations.FADE_IN, 250);
            rep.canInteract = true;
        }

        getEngine().getScene().getCurrentScene()?.removeSceneObject(this);
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
            // @ts-ignore
            if (typeof store[key] === "object") {
                // @ts-ignore
                matchingAssets.push(...this.findAssets(regexp, store[key]));
            }
            else if (key.match(regexp)) {
                // @ts-ignore
                matchingAssets.push({name: key.split(".")[0], path: store[key]});
            }
        }

        return matchingAssets;
    }

    private async parseBaseAssets() {
        const manifest = await getEngine().getAssets().load({source: `${this.assetsBase}/characters/${this.name.toLowerCase()}/manifest.json`});
        this.manifest = manifest?.data;
        const armRegex = /b(\d)arm(\d)|_(\w*)/;
        const possibleArms = this.findAssets(armRegex, this.manifest);
        for (const arm of possibleArms) {
            const armResource = await getEngine().getAssets().loadTexture({ source: `${this.assetsBase}/characters/${this.name.toLowerCase()}${arm.path}` });
            const armSprite = new Sprite(armResource?.texture);
            armSprite.name = arm.name;
            this.arms.set(arm.name, armSprite);
        }

        const bodyRegex = /body(\d)/;
        const possibleBodies = this.findAssets(bodyRegex, this.manifest);
        for (const body of possibleBodies) {
            const bodyResource = await getEngine().getAssets().loadTexture({ source: `${this.assetsBase}/characters/${this.name.toLowerCase()}${body.path}` });
            const bodySprite = new Sprite(bodyResource?.texture);
            bodySprite.name = body.name;
            this.body.set(body.name, bodySprite);
        }

        const faceRegex = /face_(\w*)/;
        const possibleFaces = this.findAssets(faceRegex, this.manifest);
        for (const face of possibleFaces) {
            const faceResource = await getEngine().getAssets().loadTexture({ source: `${this.assetsBase}/characters/${this.name.toLowerCase()}${face.path}` });
            const expressionSprite = new Sprite(faceResource?.texture);
            expressionSprite.name = face.name;
            this.expressions.set(face.name, expressionSprite);
            this.availableExpressions.push(face.name);
        }
    }

    private setBodyPart(sprite: Sprite, part: BodyPart) {
        if (this.children[part]) {
            this.removeChildAt(part);
        }
        this.addChildAt(sprite, part);
        switch(part) {
            case BodyPart.FACE:
            case BodyPart.BODY:
            case BodyPart.ARMS:
            case BodyPart.LEGS:
                if (sprite.name && this.bodyPartOverrides.has(sprite.name)) {
                    const override = this.bodyPartOverrides.get(sprite.name);
                    if (override && override.position) {
                        sprite.position.set(override.position.x, override.position.y);
                    }
                }
                else if (this.bodyPartOverrides.has(BodyPart[part])) {
                    const override = this.bodyPartOverrides.get(BodyPart[part]);
                    if (override && override.position) {
                        sprite.position.set(override.position.x, override.position.y);
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
            face.position.set(pos.x, pos.y);
            this.setBodyPart(face, BodyPart.FACE);
        }
    }

    changeBody(type: number) {
        if (type <= 4 && type > 0) {
            this.currentBody = `body${type}`;
            //this.currentArms = `b${type}-arm1`;
            const body = this.body.get(this.currentBody)!;
            //const arms = this.arms.get(this.currentArms)!;
            //const pos = getBodyPartOffset(BodyPart.ARMS);
            //arms.setTransform(pos.x, pos.y);
            this.setBodyPart(body, BodyPart.BODY);
            //this.setBodyPart(arms, BodyPart.ARMS);
        }
    }

    setBody(nameOfAsset: string) {
        if (!this.body.has(nameOfAsset)) {
            const matches = this.findAssets(nameOfAsset, this.manifest);
            if (matches.length === 0) {
                return;
            }

            getEngine().getAssets().loadTexture({ source: `${this.assetsBase}/characters/${this.name.toLowerCase()}${matches[0].path}` })
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

            getEngine().getAssets().loadTexture({ source: `${this.assetsBase}/characters/${this.name.toLowerCase()}${matches[0].path}` })
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

    addNamedBodyPartOverride(bodyPart: string, offset?: vec2) {
        this.bodyPartOverrides.set(bodyPart, {position: offset});
    }

    addBodyPartOverride(bodyPart: BodyPart, offset?: vec2) {
        this.bodyPartOverrides.set(BodyPart[bodyPart], {position: offset});
    }

    addPose(name: string, runPose: RunPose) {
        this.runPoses.set(name, runPose);
    }

    setPose(name: string) {
        const pose = this.runPoses.get(name);
        if (pose) {
            pose(this);
        }
    }

    startBuild() {
        if (this.buildMode) {
            throw new Error("startBuild was called already.");
        }
        this.buildMode = true;
        this.removeChildren();
    }

    build(assetName: string, x: number, y: number) {
        if (!this.buildMode) {
            throw new Error("build was used before startBuild was called.");
        }

        if (this.buildCache.has(assetName)) {
            const part = this.buildCache.get(assetName)!;
            part.position.set(x, y);
            this.addChild(part);
        }
        else if (this.body.has(assetName)) {
            const part = this.body.get(assetName)!;
            part.position.set(x, y);
            this.addChild(part);
        }
        else if (this.arms.has(assetName)) {
            const part = this.arms.get(assetName)!;
            part.position.set(x, y);
            this.addChild(part);
        }
        else if (this.expressions.has(assetName)) {
            const part = this.expressions.get(assetName)!;
            part.position.set(x, y);
            this.addChild(part);
        }
        else {
            const matches = this.findAssets(assetName, this.manifest);
            if (matches.length === 0) {
                return;
            }

            getEngine().getAssets().loadTexture({ source: `${this.assetsBase}/characters/${this.name.toLowerCase()}${matches[0].path}` })
            .then(asset => {
                const part = new Sprite(asset.texture);
                this.buildCache.set(matches[0].name, part);
                part.position.set(x, y);
                this.addChild(part);
            });
        }
    }

    endBuild() {
        if (!this.buildMode) {
            throw new Error("endBuild was called but build has not started.");
        }
        this.buildMode = false;
    }

    clearBuildCache() {
        this.buildCache.clear();
    }

    flip(x?: boolean, y?: boolean) {
        if (x) {
            this.scale.x *= -1;
        }

        if (y) {
            this.scale.y *= -1;
        }
    }

    flipBodyPart(part: BodyPart, x?: boolean, y?: boolean) {
        const child = this.getChildAt(part);
        if (x) {
            child.scale.x *= -1;
        }

        if (y) {
            child.scale.y *= -1;
        }
    }

    resetOrientation() {
        this.scale.set(Math.abs(this.scale._x), Math.abs(this.scale._y));
        for (const c of this.children) {
            c.scale.set(Math.abs(c.scale._x), Math.abs(c.scale._y));
        }
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
    displayedSprite?: Sprite;
    sprites: Map<string, Sprite>;
    constructor(displayName: string, defaultSprite: IRenderableResource, npc?: NPC) {
        super(undefined, "world_"+displayName, () => {});
        this.addAction({action: "interact", handler: this.enterDialogue.bind(this)});
        this.npcName = displayName;
        this.npc = npc;
        this.npc?.addWorldRep(this);
        this.sprites = new Map<string, Sprite>();
        this.createSprite("default", defaultSprite)
        .then(_ => {
           this.setDisplaySprite("default");
        });

    }

    enterDialogue() {
        if (!this.npc) {
            const npc: NPC|undefined = getEngine().getEnt().findEntityByName(this.npcName) as NPC;
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

    async createSprite(name: string, resource: IRenderableResource) {
        const sprite = await getEngine().createSimpleSprite(resource);
        if (sprite) {
            this.sprites.set(name, sprite);
        }
    }

    setDisplaySprite(name: string) {
        this.displayedSprite = this.sprites.get(name);
        if (this.displayedSprite) {
            this.removeChildren();
            this.addChildAt(this.displayedSprite, 0);
        }
    }
}
