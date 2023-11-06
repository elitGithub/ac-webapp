import { Sprite } from "pixi.js";
import { BaseCharacter } from "../engine/coreentities/basecharacter";
import { EngineBus, IEngineEvent, getEngine } from "../engine";
import { vec2 } from "../core/math/models";
import { queueNamedAnimate } from "../engine/rendereffects";
import SceneTransitionFlags from "../engine/scene/models/scenetransitions";
import { Animation, AnimationListener } from "../engine/rendereffects/models";

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

export class NPC extends BaseCharacter implements AnimationListener {
    assetsBase: string;
    availableExpressions = ["afraid", "angry", "annoyed", "blush", "concerned", "confident", "cringe",
        "displeased", "embarrassed", "excited", "eyeroll", "flirty", "laughing", "neutral", "sad",
        "sarcastic", "skeptical", "smile", "thinking", "worried"];
    expressions: Map<string, Sprite>;
    body: Map<string, Sprite>;
    arms: Map<string, Sprite>;
    bodyPartOverrides: Map<string, any>;
    transitioning: boolean;
    transitioningTo: string;
    currentExpression: string;
    currentBody: string;
    currentArms: string;

    constructor(displayName: string) {
        const action = {
            action: "interact",
            handler: () => {
                queueNamedAnimate(this, SceneTransitionFlags[SceneTransitionFlags.ST_FADE], 500);
                this.transitioning = true;
                this.transitioningTo = this.availableExpressions[Math.round(Math.random() * this.availableExpressions.length) - 1];
            },
        };
        super(displayName, undefined, action);
        this.assetsBase = "/src/assets/characters";
        this.expressions = new Map<string, Sprite>();
        this.body = new Map<string, Sprite>();
        this.arms = new Map<string, Sprite>();
        this.transitioning = false;
        this.transitioningTo = "";
        this.bodyPartOverrides = new Map<string, any>();
        this.parseBaseAssets().then(() => {
            this.currentBody = "body1";
            this.currentExpression = "neutral";
            this.currentArms = "body1-arm1";
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

    private async parseBaseAssets() {
        let bodyType = 1;
        for (; bodyType <= 4; bodyType++) {
            const bodyResource = await getEngine().getAssets().load({ source: `${this.assetsBase}/${this.name.toLowerCase()}/avatar/body${bodyType}.webp` });
            const bodySprite = new Sprite(bodyResource?.texture);
            this.body.set(`body${bodyType}`, bodySprite);

            let armResource;
            try {
                armResource = await getEngine().getAssets().load({ source: `${this.assetsBase}/${this.name.toLowerCase()}/avatar/b${bodyType}arm1_n.webp` });
            }
            catch(e) {
                armResource = await getEngine().getAssets().load({ source: `${this.assetsBase}/${this.name.toLowerCase()}/avatar/b${bodyType}arm1.webp` });
            }
            
            const armSprite = new Sprite(armResource?.texture);
            this.arms.set(`body${bodyType}-arm1`, armSprite);
        }

        for (const e of this.availableExpressions) {
            const faceResource = await getEngine().getAssets().load({ source: `${this.assetsBase}/${this.name.toLowerCase()}/avatar/face_${e}.webp` });
            const expressionSprite = new Sprite(faceResource?.texture);
            this.expressions.set(e, expressionSprite);
        }

    }

    changeExpression(expression: string) {
        if (this.expressions.has(expression.toLowerCase())) {
            this.currentExpression = expression;
            const pos = getBodyPartOffset(BodyPart.FACE);
            const face = this.expressions.get(this.currentExpression)!;
            face.setTransform(pos.x, pos.y);
            this.removeChildAt(BodyPart.FACE);
            this.addChildAt(face, BodyPart.FACE);
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
            this.removeChildAt(BodyPart.BODY);
            this.addChildAt(body, BodyPart.BODY);
            this.removeChildAt(BodyPart.ARMS);
            this.addChildAt(arms, BodyPart.ARMS);
        }
    }

    addBodyPartOverride(bodyPart: string, offset?: vec2) {
        this.bodyPartOverrides.set(bodyPart, offset);
    }

    onAnimationsFinish(animation: Animation) {
        if (this.transitioning && animation.target === this) {
            if (this.transitioningTo) {
                this.changeExpression(this.transitioningTo);
                this.transitioningTo = "";
                queueNamedAnimate(this, SceneTransitionFlags[SceneTransitionFlags.ST_FADE] + "_REVERSE", 500);
            }
            else {
                this.transitioning = false;
            }
        }
    }
}