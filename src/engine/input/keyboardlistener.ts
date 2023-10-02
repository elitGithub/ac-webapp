import { EventBus } from "../../framework/events";
import { Keyboard_Press, Keyboard_Release, Keyboard_Click } from "./keyboardevents";

export abstract class KeyboardListener {
    constructor() {
        EventBus.on(Keyboard_Press, this.onKeyPress.bind(this));
        EventBus.on(Keyboard_Release, this.onKeyRelease.bind(this));
        EventBus.on(Keyboard_Click, this.onKeyClicked.bind(this));
    }

    abstract onKeyPress(event: any): void;

    abstract onKeyRelease(event: any): void;

    abstract onKeyClicked(event: any): void;
}