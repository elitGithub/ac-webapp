import { Container, Rectangle, Sprite } from "pixi.js";
import { getEngine } from "../../engine";

enum QuestHintEffect {
    NONE,
    BLEND,
    ARROW,
    PARTICLE,
}

export class QuestHint {
    hintEnabled: boolean;
    target: Container;
    hintEffect: QuestHintEffect;
    hintSprite?: Sprite;
    
    constructor(target: Container, hintEffect: QuestHintEffect = QuestHintEffect.ARROW, opts?: any) {
        this.hintEnabled = true;
        this.target = target;
        this.hintEffect = hintEffect;
        switch(hintEffect) {
            case QuestHintEffect.NONE:
            case QuestHintEffect.BLEND:
            case QuestHintEffect.ARROW:{
                getEngine().createSimpleSprite({source: opts.sprite})
                .then(sprite => {
                    if (sprite) {
                        this.hintSprite = sprite;
                        this.positionHintSprite();
                    }
                });
                break;
            }
            case QuestHintEffect.PARTICLE:
        }
    }

    toggleHint() {
        if (this.hintEnabled) {
            this.hintEnabled = false;
            if (this.hintSprite) {
                this.hintSprite.visible = false;
            }
        }
        else {
            this.hintEnabled = true;
            if (this.hintSprite) {
                this.hintSprite.visible = true;
            }
        }
    }

    positionHintSprite() {
        if (!this.hintSprite) {
            return;
        }

        const SPRITE_TARGET_BUFFER = 10;
        const SPRITE_WINDOW_EDGE_BUFFER = 10;
        const targetBounds = this.target.getBounds(true);
        const hintBounds = this.hintSprite.getBounds(true);

        const xCenter = targetBounds.width/2;
        const yCenter = targetBounds.height/2;

        const dimensions = getEngine().getRender().getDimensions();
        let windowRect = new Rectangle(0, 0, dimensions.x, dimensions.y);
        let hintRect = new Rectangle();
        hintRect.copyFrom(hintBounds);
        hintRect.x = xCenter;
        if (hintRect.left >= windowRect.left || hintRect.right <= windowRect.right) {
            hintRect.y = targetBounds.top - SPRITE_TARGET_BUFFER - hintRect.height/2;
            if (hintRect.top >= windowRect.top + SPRITE_WINDOW_EDGE_BUFFER) {
                this.hintSprite.angle = 180;
                this.hintSprite.setTransform(hintRect.x, hintRect.y);
                return;
            }

            hintRect.y = targetBounds.bottom + SPRITE_TARGET_BUFFER + hintRect.height/2;
            if (hintRect.bottom <= windowRect.bottom - SPRITE_WINDOW_EDGE_BUFFER) {
                this.hintSprite.setTransform(hintRect.x, hintRect.y);
                return;
            }
        }

        hintRect.y = yCenter;
        hintRect.x = 0;
        if (hintRect.top >= windowRect.top || hintRect.bottom <= windowRect.bottom) {
            hintRect.x = targetBounds.left - SPRITE_TARGET_BUFFER - hintRect.width/2;
            if (hintRect.left >= windowRect.left + SPRITE_WINDOW_EDGE_BUFFER) {
                this.hintSprite.angle = 270;
                this.hintSprite.setTransform(hintRect.x, hintRect.y);
                return;
            }

            hintRect.x = targetBounds.right + SPRITE_TARGET_BUFFER + hintRect.width/2;
            if (hintRect.right <= windowRect.right - SPRITE_WINDOW_EDGE_BUFFER) {
                this.hintSprite.angle = 90;
                this.hintSprite.setTransform(hintRect.x, hintRect.y);
                return;
            }
        }

        console.log("can't position hint for "+this.target.name);
    }
}