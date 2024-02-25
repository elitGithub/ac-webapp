import { Scene } from "../Engine/engine/scene";
import { getEngine } from "../Engine/engine";
import { DecisionTree } from "./DecisionTree.ts";
import { ConfigConditionsEvaluator } from "./helpers/ConfigConditionsEvaluator.ts";
import { InteractionsBuilder } from "./helpers/InteractionsBuilder.ts";
import { Sprite } from "pixi.js";

export class SceneFactory {
    private interactionsBuilder: InteractionsBuilder;
    public scenesToLoad: Scene[] = [];
    private engine;
    constructor(private decisionTree: DecisionTree) {
        this.interactionsBuilder = new InteractionsBuilder();
        this.engine = getEngine();
    }

    public async loadScenes(scenes: string[] = []) {
        scenes.map(async (scene) => {
            const module = await import(`./configFiles/${ scene }.js`);
            const configuration = module?.configuration;
            if (!configuration) {
                throw new Error('Scene not');
            }
            this.decisionTree.setDefaultStateForScene(scene, configuration.stateVariables);

            // TODO: set state variables from DecisionTree.
            const evaluator = new ConfigConditionsEvaluator(this.decisionTree.state, configuration.stateVariables);
            const sceneObject = new Scene(configuration.title, { source: configuration.background });
            configuration.dynamicAssets.map(async (asset: any) => {
                // TODO: add type to config - if its interactable, if not, etc.
                if (evaluator.evaluate(asset)) {
                    let sceneItem;
                    if (asset.actions) {
                        sceneItem = await this.interactionsBuilder.setUpSceneItem(asset);
                    } else {
                        sceneItem =  Sprite.from(asset.src);
                    }
                    if (!sceneItem) {
                        return;
                    }
                    const size = getEngine().getRender().getDimensions();
                    const baseWidth = size.x;
                    const baseHeight = size.y;
                    if (!asset.position || !asset.position[0]) {
                        console.log(asset);
                        console.log(asset.position);
                    }
                    let xRatio = asset.position[0] / baseWidth;
                    let yRatio = asset.position[1] / baseHeight;
                    let { x, y } = getEngine().SPR(xRatio, yRatio);
                    sceneItem.setTransform(x, y);
                    sceneObject.addSceneObject(sceneItem);
                }
                this.scenesToLoad.push(sceneObject);
            });
        });

        this.engine.getScene().addScenes(this.scenesToLoad)
    }

}

