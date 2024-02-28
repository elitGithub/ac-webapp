import { createEngineEvent, EngineBus, getEngine } from "../../Engine/engine";
import { Transition_Scene } from "../../Engine/engine/scene";
import SceneTransitionFlags from "../../Engine/engine/scene/models";
import { START_DIALOGUE } from "../../Engine/gameplay/dialogue";

export class InteractionsBuilder {
    private engine;

    constructor() {
        this.engine = getEngine();
    }

    public setUpSceneItem(asset: any) {
        const { actions } = asset;
        let interaction = {
            action: 'interact,',
            handler: () => {},
        };
        actions.forEach((action: any) => {
            if (action.go) {
                interaction = this.setupGoAction(asset.name, action.go);
            } else if (action.interact) {
                // For simplicity, assuming all non-'go' actions use setupInteractAction
                interaction = this.setupInteractAction(action.interact);
            }
        });

        return this.engine.createSimpleInteractable(
            asset.name,
            interaction,
            { source: asset.src }
        )
    }


    private setupGoAction(name: string, goConfig: any) {
        const { to, condition } = goConfig;
        let handler = () => {};
        if (this.meetsCondition('go', condition)) {
            console.log('MEETS CONDITIONS?!', name);
            handler = () => {
                console.log('interact with: go', name);
                EngineBus.emit(
                    Transition_Scene,
                    createEngineEvent(Transition_Scene, {
                        sceneName: to,
                        sceneTransition: SceneTransitionFlags.ST_FADE,
                    })
                );
            }
        }
        return {
            action: 'interact',
            handler,
        };
    }


    private setupInteractAction(interactConfig: any) {
        const { dependsOn, condition, event: eventType } = interactConfig;
        let handler = () => {};
        if (!condition || this.meetsCondition(dependsOn, condition)) {
            // Assuming START_DIALOGUE is an example of a different action event you might use
            const event = eventType === "START_DIALOGUE" ? START_DIALOGUE : Transition_Scene; // Adjust logic as necessary
            handler =  () => {
                EngineBus.emit(
                    Transition_Scene,
                    createEngineEvent(event, {
                        sceneName: 'Bathroom',
                        sceneTransition: SceneTransitionFlags.ST_FADE,
                    })
                );
            }
        }
        return {
            action: 'interact',
            handler,
        };
    }


    private meetsCondition(dependsOn: string, condition: any): boolean {
        // Retrieve current quest system state
        const questSys = this.engine.getGame().questSys;
        if (!Object.keys(condition).length) {
            return true;
        }
        // Example condition checks
        switch (dependsOn) {
            case 'focusedQuest':
                const { focusedOn, focusedQuestStep } = condition;
                const focusedQuest = questSys.focusedQuest;
                if (!focusedQuest) {
                    return false;
                }
                if (focusedOn.includes(focusedQuest.title) && focusedQuestStep.includes(focusedQuest.getCurrentQuestStep()?.questStepId)) {
                    return true;
                }
                break;
            // Implement other dependency checks as needed
        }
        return false;
    }

}
