import { StateVariables } from "./helpers/types.ts";

export class DecisionTree {
    private defaultState: StateVariables = {};
    private newState: StateVariables = {};

    get state() {
        return this.defaultState;
    }

    get realState() {
        return this.newState;
    }

    public playerChoice(key: string, choiceKey: string, choiceValue: any) {
        this.newState[key][choiceKey] = choiceValue;
    }

    public setDefaultStateForScene(sceneName: string, state: any) {
        this.defaultState[sceneName] = state;
    }
}
