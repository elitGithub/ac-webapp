import { Prep_Scenes, Scene } from "../../../src/engine/scene";
import { createEngineEvent, EngineBus } from "../../../src/engine";

type StateVariables = {
    [key: string]: any;
};

type StaticAssetConfig = {
    name: string;
    conditions: string;
    src: string;
};

type SceneConfig = {
    title: string;
    background: string;
    stateVariables: StateVariables;
    dynamicAssets: StaticAssetConfig[];
};

class SafeConditionEvaluator {
    private state: StateVariables;

    constructor(state: StateVariables) {
        this.state = state;
    }

    public evaluate(condition: string): boolean {
        const tokens = condition.split(' ').map(token => {
            if (['and', 'not', 'or', '==', '!=', '<', '>', '<=', '>='].includes(token)) {
                return token;
            } else if (this.state.hasOwnProperty(token)) {
                return this.state[token];
            }
            return token;
        });

        const expression = tokens.join(' ');
        try {
            return Function(`"use strict";return (${expression});`)();
        } catch (error) {
            console.error("Error evaluating condition:", condition, error);
            return false;
        }
    }
}

export class DynamicSceneLoader {
    private sceneConfig: SceneConfig;

    constructor(sceneConfig: SceneConfig) {
        this.sceneConfig = sceneConfig;
    }

    public async loadScene() {
        const { title, background, stateVariables, dynamicAssets } = this.sceneConfig;
        const evaluator = new SafeConditionEvaluator(stateVariables);
        const scene = new Scene(title, { source: background });

        for (const asset of dynamicAssets) {
            if (evaluator.evaluate(asset.conditions)) {
                try {
                    const module = await import(`../../../../${asset.src}`);
                    scene.addSceneObject(new module.default());
                } catch (error) {
                    console.error("Error loading asset:", asset.name, error);
                }
            }
        }

        EngineBus.emit(Prep_Scenes, createEngineEvent(Prep_Scenes, { scenes: [scene] }));
    }
}

// Example usage - assuming the sceneConfig is imported or defined elsewhere in your project
// const sceneConfig: SceneConfig = {/* JSON configuration goes here */};
// const loader = new DynamicSceneLoader(sceneConfig);
// loader.loadScene();
