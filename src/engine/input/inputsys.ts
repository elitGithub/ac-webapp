import { EngineBus, EngineSystem, IEngineEvent } from "../enginesys";
import { Keyboard } from "./keyboard";
import { Keyboard_Press, Keyboard_Release, Keyboard_Click } from "./keyboardevents";
import { KeyboardListener } from "./keyboardlistener";

export class InputSystem implements EngineSystem {

    constructor() {
        Keyboard.initialise(this.onKeyDown.bind(this), this.onKeyUp.bind(this), true);
    }

    onKeyDown(preState: boolean, e: KeyboardEvent) {
        EngineBus.emit(Keyboard_Press, {});
    }

    onKeyUp(preState: boolean, e: KeyboardEvent) {
        if (preState && Keyboard.isKeyPressed(e.code)) {
            EngineBus.emit(Keyboard_Click, {});
        }
        else {
            EngineBus.emit(Keyboard_Release, {});
        }
    }

    mockKeyPress(code: string, where?: Element) {
        const event = new KeyboardEvent("keydown", {
            view: window,
            bubbles: true,
            cancelable: true,
        });

        (where??window).dispatchEvent(event);
    }

    mockKeyRelease(code: string, where?: Element) {
        const event = new KeyboardEvent("keyup", {
            view: window,
            bubbles: true,
            cancelable: true,
        });

        (where??window).dispatchEvent(event);
    }

    mockPointerClick(x: number, y: number) {
        
    }

    mockPointerHover(x: number, y: number, duration: number) {

    }

    subscribeToKeyboardEvents(listener: KeyboardListener) {
        EngineBus.on(Keyboard_Press, listener.onKeyPress.bind(listener));
        EngineBus.on(Keyboard_Release, listener.onKeyRelease.bind(listener));
        EngineBus.on(Keyboard_Click, listener.onKeyClicked.bind(listener));
    }

    queue(engineEvent: IEngineEvent): void {
        throw new Error("Method not implemented.");
    }

    update(time: number): void {
        throw new Error("Method not implemented.");
    }
    
}