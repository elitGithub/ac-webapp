import { EventBus } from "../../framework/events";
import { EngineSystem, IEngineEvent } from "../enginesys";
import { Keyboard } from "./keyboard";
import { Keyboard_Press, Keyboard_Release, Keyboard_Click } from "./keyboardevents";
import { KeyboardListener } from "./keyboardlistener";

export class InputSystem implements EngineSystem {

    constructor() {
        Keyboard.initialise();
    }

    mockKeyPress(code: string) {

    }

    mockKeyRelease(code: string) {

    }

    mockPointerClick(x: number, y: number) {

    }

    mockPointerHover(x: number, y: number, duration: number) {

    }

    subscribeToKeyboardEvents(listener: KeyboardListener) {
        EventBus.on(Keyboard_Press, listener.onKeyPress.bind(listener));
        EventBus.on(Keyboard_Release, listener.onKeyRelease.bind(listener));
        EventBus.on(Keyboard_Click, listener.onKeyClicked.bind(listener));
    }

    queue(engineEvent: IEngineEvent): void {
        throw new Error("Method not implemented.");
    }

    update(time: number): void {
        throw new Error("Method not implemented.");
    }
    
}