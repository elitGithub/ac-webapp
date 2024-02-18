import { Prep_Scenes, Scene } from "../../../src/engine/scene";
import { createEngineEvent, EngineBus, getEngine } from "../../../src/engine";
import { DecisionTree } from "./DecisionTree.ts";
import { QuestState } from "../../../src/gameplay/quest";
import { START_DIALOGUE } from "../../../src/gameplay/dialogue";

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
    private playerDecisions: any;

    constructor(playerDecisions: any, state: StateVariables) {
        this.state = state;
        this.playerDecisions = playerDecisions;
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

    public async loadScenes(scenes: any[] = []) {
        scenes.map(async (scene) => {
            // const { configuration: data } = await import("./foo.json", { assert: { type: "json" } });
            const module = await import(`./configFiles/${scene}.js`);
            // const module = await import(`./configFiles/${scene}.json`);
            // const configuration = new module.default();
            console.log(module.configuration);
            const configuration = module?.configuration;
            if (!configuration) {
                throw new Error('Scene not');
            }
            const decisionTree = new DecisionTree();
            // TODO: set state variables from DecisionTree.
            const evaluator = new SafeConditionEvaluator(decisionTree.state, configuration.stateVariables);
            // const BedroomScene = new Scene("Bedroom", { source: Bedroom });
            const sceneObject = new Scene(configuration.title, {source: configuration.background});
            configuration.dynamicAssets.map(async (asset: any) => {
                if (evaluator.evaluate(asset.conditions)) {
                    const sceneInteractable = await getEngine().createSimpleInteractable(
                        asset.name,
                        {
                            action: "interact",
                            handler: () => {
                                if (
                                    getEngine().getGame().questSys.findByTitle("Dress to the Nine")
                                        .state === QuestState.IN_PROGRESS
                                ) {
                                    EngineBus.emit(
                                        START_DIALOGUE,
                                        createEngineEvent(START_DIALOGUE, {
                                            dialogueId: "ClosetDialogue",
                                        })
                                    );
                                    return;
                                }
                            },
                        },
                        { source: asset.src }
                    );
                    sceneObject.addSceneObject(sceneInteractable);
                }
            });
            EngineBus.emit(
                Prep_Scenes,
                createEngineEvent(Prep_Scenes, {
                    scenes: [sceneObject],
                })
            );
        });
    }

    // public async loadScene() {
    //     const { title, background, stateVariables, dynamicAssets } = this.sceneConfig;
    //     const evaluator = new SafeConditionEvaluator(stateVariables);
    //     const scene = new Scene(title, { source: background });
    //
    //     for (const asset of dynamicAssets) {
    //         if (evaluator.evaluate(asset.conditions)) {
    //             try {
    //                 const module = await import(`../../../../${asset.src}`);
    //
    //                 scene.addSceneObject(new module.default());
    //             } catch (error) {
    //                 console.error("Error loading asset:", asset.name, error);
    //             }
    //         }
    //     }
    //
    //     EngineBus.emit(Prep_Scenes, createEngineEvent(Prep_Scenes, { scenes: [scene] }));
    // }
}

// Example usage - assuming the sceneConfig is imported or defined elsewhere in your project
// const sceneConfig: SceneConfig = {/* JSON configuration goes here */};
// const loader = new DynamicSceneLoader(sceneConfig);
// loader.loadScene();
