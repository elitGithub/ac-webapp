import { Container } from "pixi.js";
export class HudElement extends Container {
    draw: boolean;

    constructor() {
        super();
        this.draw = false;
    }
}