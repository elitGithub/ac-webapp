import { Sprite, Graphics, Container, Text } from "pixi.js";
import { HudElement } from "../Engine/engine/gui";
import { getEngine } from "../Engine/engine";
import EnergyBarBorder from "../../public/assets/images/ui/hud/bar_border_energy.webp";
import EnergyBarBack from "../../public/assets/images/ui/hud/bar_back_energy.webp";
import EnergyBarFront from "../../public/assets/images/ui/hud/bar_front_energy.webp";

export class EnergyHudElement extends HudElement {

    border?: Sprite;
    back?: Sprite;
    front?: Sprite;
    energyContainer: Container;
    barMask: Graphics;
    text: Text;

    constructor() {
        super();
        this.sortableChildren = true;
        getEngine().createSimpleSprite({source: EnergyBarBorder})
        .then(sprite => {
            if (sprite) {
                this.border = sprite;
                this.border.zIndex = 0;
                this.addChild(this.border);
            }
        });

        getEngine().createSimpleSprite({source: EnergyBarBack})
        .then(sprite => {
            if (sprite) {
                this.back = sprite;
                this.back.zIndex = 1;
                this.addChild(this.back);
            }
        });

        getEngine().createSimpleSprite({source: EnergyBarFront})
        .then(sprite => {
            if (sprite) {
                this.front = sprite;
                this.barMask.beginFill(0xffffff);
                this.barMask.drawRect(0, 0, this.front.width, this.front.height);
                this.barMask.endFill();
                this.energyContainer.mask = this.barMask;
                this.energyContainer.addChild(this.barMask);
                this.energyContainer.addChild(this.front);
                this.text.position.set(this.front.width / 2, this.front.height / 2);
            }
        });

        this.energyContainer = new Container();
        this.barMask = new Graphics();
        this.energyContainer.zIndex = 2;
        this.text = new Text();
        this.text.zIndex = 3;
        this.text.anchor.set(0.5);
        this.addChild(this.energyContainer, this.text);
    }

    setEnergy(value: number, maxValue: number) {
        if (this.front) {
            this.barMask.clear();
            this.barMask.beginFill(0xffffff);
            this.barMask.drawRect(0, 0, this.front.width * (value/maxValue), this.front.height);
            this.barMask.endFill();
        }

        this.text.text = `${value} / ${maxValue}`;
    }
}
