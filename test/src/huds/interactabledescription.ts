import { Sprite, Text} from "pixi.js";
import { getEngine } from "../../../src/engine";
import { Popup } from "../../../src/engine/gui";
import LabelTitleBg from "./../assets/ui/frame_objname_gold.webp";
import LabelBodyBg from "./../assets/ui/frame_popup.webp";

export class InteractableDescription extends Popup {
    displayName: string;
    description: string;
    titleBg: Sprite;
    bodyBg: Sprite;
    titleText: Text;
    bodyText: Text;

    constructor(displayName: string, description: string) {
        super();

        this.displayName = displayName;
        this.description = description;
        this.sortableChildren = true;

        getEngine().createSimpleSprite({source: LabelTitleBg})
        .then(sprite => {
            if (sprite) {
                this.titleBg = sprite;
                this.titleBg.position.set(150, 0);
                this.addChild(this.titleBg, this.titleText);
            }
        });

        getEngine().createSimpleSprite({source: LabelBodyBg})
        .then(sprite => {
            if (sprite) {
                this.bodyBg = sprite;
                this.bodyBg.position.set(0, 40);
                this.bodyBg.zIndex = -1;
                this.bodyBg.visible = false;
                this.addChild(this.bodyBg, this.bodyText);
            }
        });

        this.titleText = new Text(this.displayName);
        this.titleText.x = 230;
        this.titleText.y = 20;
        this.bodyText = new Text(this.description);
        this.bodyText.x = 100;
        this.bodyText.y = 100;
        this.bodyText.visible = false;
    }

    show() {
        this.titleText.visible = true;
        if (this.description) {
            this.bodyText.visible = true;
        }
        
        if (this.titleBg) {
            this.titleBg.visible = true;
        }

        if (this.bodyBg && this.description) {
            this.bodyBg.visible = true;
        }
        super.show();
    }

    hide() {
        this.titleText.visible = false;
        this.bodyText.visible = false;
        if (this.titleBg) {
            this.titleBg.visible = false;
        }

        if (this.bodyBg) {
            this.bodyBg.visible = false;
        }
        super.hide();
    }
}