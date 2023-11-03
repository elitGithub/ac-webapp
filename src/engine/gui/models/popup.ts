import { Container } from "pixi.js";

export class Popup extends Container {
    constructor() {
        super();
        this.visible = false;
    }
    
    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }
}