import { Prep_Scenes, Scene } from "../Engine/engine/scene";
import { createEngineEvent, EngineBus, getEngine } from "../Engine/engine";
import { DecisionTree } from "./DecisionTree.ts";
import { ConfigConditionsEvaluator } from "./helpers/ConfigConditionsEvaluator.ts";
import { SceneItemsBuilder } from "./helpers/SceneItemsBuilder.ts";
import { Location } from "../Engine/engine/coreentities/location.ts";

export class Factory {
    private engine;
    private interactionsBuilder: SceneItemsBuilder;
    public scenesToLoad: string[] = [];
    public scenesToPrep: Scene[] = [];

    constructor(private decisionTree: DecisionTree) {
        this.interactionsBuilder = new SceneItemsBuilder();
        this.engine = getEngine();
    }

    public async buildLocationFromSchematics(scenes: string[] = []) {
        const loadPromises = scenes.map(async (scene) => {
            const module = await import(`./schematics/LocationSchematics/${ scene }.js`);
            const configuration = module?.configuration;
            if (!configuration) {
                throw new Error('Scene not found');
            }
            this.decisionTree.setDefaultStateForScene(scene, configuration.stateVariables);

            // TODO: set state variables from DecisionTree.
            const evaluator = new ConfigConditionsEvaluator(this.decisionTree.state, configuration.stateVariables);
            const sceneObject = new Location(configuration.title, { source: configuration.background });
            const sceneAssetsList = [];
            configuration.dynamicAssets.map(async (asset: any) => {
                // TODO: add type to config - if its interactable, if not, etc.
                if (evaluator.evaluate(asset)) {
                    sceneAssetsList.push({key: asset.name, source: asset.src});
                    let sceneItem = await this.interactionsBuilder.createLocationItems(asset);
                    if (!sceneItem) {
                        console.log(`${ asset.name } item failed to create a sprite`);
                        return;
                    }
                    const size = this.engine.getRender().getDimensions();
                    const baseWidth = size.x;
                    const baseHeight = size.y;
                    if (!asset.position || !asset.position[0]) {
                        console.log('asset does not have position', asset.name);
                        console.log(asset);
                        console.log(asset.position);
                        return;
                    }
                    let xRatio = asset.position[0] / baseWidth;
                    let yRatio = asset.position[1] / baseHeight;
                    let { x, y } = this.engine.SPR(xRatio, yRatio);
                    sceneItem.setTransform(x, y);
                    sceneObject.addSceneObject(sceneItem);
                }
            });
            this.scenesToPrep.push(sceneObject);
            this.scenesToLoad.push(scene);
        });

        return Promise.allSettled(loadPromises).then(() => {
            EngineBus.emit(
                Prep_Scenes,
                createEngineEvent(Prep_Scenes, {
                    scenes: this.scenesToPrep,
                }),
            );
        });
    }

}

