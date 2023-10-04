export type KeyboardCB = {
    (preState: boolean, e: KeyboardEvent) : void;
};

export class Keyboard {
    public static readonly state: Map<string, boolean>;
    static keyDownCb: Function;
    static keyUpCb: Function;
    static firePreState: boolean;

    public static initialise(keyDownCb: KeyboardCB, keyUpCb: KeyboardCB, receivePreState: boolean) {
        document.addEventListener("keydown", Keyboard.keyDown);
        document.addEventListener("keyup", Keyboard.keyUp);
        Keyboard.keyDownCb = keyDownCb;
        Keyboard.keyUpCb = keyUpCb;
        Keyboard.firePreState = receivePreState;
    }

    private static keyDown(e: KeyboardEvent): void {
        if (Keyboard.firePreState) {
            Keyboard.keyDownCb(true, e);
        }
        Keyboard.state.set(e.code, true);
        Keyboard.keyDownCb(false, e);
    }

    private static keyUp(e: KeyboardEvent): void {
        if (Keyboard.firePreState) {
            Keyboard.keyUpCb(true, e);
        }
        Keyboard.state.set(e.code, false);
        Keyboard.keyUpCb(false, e);
    }

    public static isKeyPressed(code: string) {
        return !!Keyboard.state.get(code);
    }
}