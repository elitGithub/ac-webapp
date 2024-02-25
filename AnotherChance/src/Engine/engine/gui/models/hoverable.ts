import { BLEND_MODES, Container, Sprite } from "pixi.js";
import { IRenderableResource } from "../../../framework/graphics";
import { getEngine } from "../..";
import { Cloneable, SpriteFactory } from "../../render/models";

export class Hoverable extends Container implements Cloneable<Hoverable>{
    mainSprite?: Sprite;
    hoverSprite?: Sprite;
    hovering: boolean;

    constructor(mainTexture?: IRenderableResource, hoverTexture?: IRenderableResource) {
        super();

        if (mainTexture) {
            getEngine().createSimpleSprite(mainTexture)
                .then(sprite => {
                    if (sprite) {
                        this.mainSprite = sprite;
                        this.addChildAt(this.mainSprite, 0);
                    }
                });
        }

        if (hoverTexture) {
            getEngine().createSimpleSprite(hoverTexture)
                .then(sprite => {
                    if (sprite) {
                        this.hoverSprite = sprite;
                    }
                });
        }

        this.hovering = false;
        this.eventMode = "dynamic";
        this.on("pointerover", this.onPointerOver.bind(this));
        this.on("pointerout", this.onPointerLeave.bind(this));
    }

    clone() {
        const hoverable = new Hoverable();
        if (this.mainSprite) {
            hoverable.mainSprite = SpriteFactory.ToSpriteFactory(this.mainSprite).clone();
            hoverable.addChildAt(hoverable.mainSprite, 0);
        }

        if (this.hoverSprite) {
            hoverable.hoverSprite = SpriteFactory.ToSpriteFactory(this.hoverSprite).clone();
        }

        return hoverable;
    };

    onPointerOver() {
        if (this.hoverSprite) {
            this.removeChildren();
            this.addChildAt(this.hoverSprite, 0);
        }
        else {
            if (this.mainSprite) {
                this.mainSprite.blendMode = BLEND_MODES.SCREEN;
            }
        }

        this.hovering = true;
    }

    onPointerLeave() {
        if (this.mainSprite) {
            this.removeChildren();
            this.addChildAt(this.mainSprite, 0);
            if (!this.hoverSprite && this.hovering) {
                this.mainSprite.blendMode = BLEND_MODES.NORMAL;
            }
        }

        this.hovering = false;
    }
}