import { InvokeContextHandlers } from "../core/util/function";
import { controlledObjectMerge } from "../core/util/object";
import { EngineSystem, getEngine, IEngineEvent } from "../engine";
import { SceneChangeEvent, SceneListener, subscribeToSceneEvents } from "../engine/scene";
import { DevModGameInterfaceContextFunction } from "../modsystem";
import { FiniteResource } from "./finiteresource";
import { GameplaySystem } from "./gameplaysys";
import { QuestListener, QuestSystem, QuestUpdateEvent, subscribeToQuestEvents } from "./quest";
import { Time, TimeProgression } from "./time";

export class BaseGame implements EngineSystem, SceneListener, QuestListener {
    energy: FiniteResource;
    finiteResources: Map<string, FiniteResource>;
    clock: Time;
    gameSystems: Map<string, GameplaySystem>;
    questSys!: QuestSystem;
    onScenePre: InvokeContextHandlers<DevModGameInterfaceContextFunction>;
    onScenePost: InvokeContextHandlers<DevModGameInterfaceContextFunction>;

    constructor(opts: any) {
        this.finiteResources = new Map<string, FiniteResource>;
        this.gameSystems = new Map<string, GameplaySystem>;
        this.clock = new Time(opts?.clockType ?? TimeProgression.MANUAL, opts?.clockSens);

        this.onScenePre = new InvokeContextHandlers();
        this.onScenePost = new InvokeContextHandlers();
        this.questSys = new QuestSystem();
        this.energy = new FiniteResource(100);

        subscribeToQuestEvents(this);
        subscribeToSceneEvents(this);
    }

    createFiniteResource(name: string, maxValue: number): void {
        if (!this.finiteResources.has(name)) {
            this.finiteResources.set(name, new FiniteResource(maxValue));
        }
    }

    getFiniteResource<T extends FiniteResource = FiniteResource>(name: string): T | undefined {
        return this.finiteResources.get(name) as T;
    }

    registerGameSystem(name: string, system: GameplaySystem) {
        if (!this.gameSystems.has(name)) {
            this.gameSystems.set(name, system);
        }
    }

    getGameSystem<T extends GameplaySystem>(name: string): T | undefined {
        const gs = this.gameSystems.get(name);
        if (gs) {
            return gs as T;
        }
    }

    getClock() {
        return this.clock;
    }

    onSceneChanged(sceneChange: SceneChangeEvent): void {
        this.onScenePre.runHandlers(
            sceneChange.previousScene ? getEngine().getScene().sceneByName(sceneChange.previousScene) : undefined,
            getEngine().getScene().sceneByName(sceneChange.scene)
        );
    }

    onSceneTransitioned(sceneChange: SceneChangeEvent): void {
        this.onScenePost.runHandlers(getEngine().getScene().sceneByName(sceneChange.scene));
    }

    onQuestUpdate(event: QuestUpdateEvent): void {
        console.log(event);
    }

    queue(engineEvent: IEngineEvent): void {
        console.log(engineEvent);
    }

    update(time: number): void {
        this.clock.simulatedTimeUpdate(time);
    }

    loadState(data: BaseGame): void {
        if (data.finiteResources) {
            for (const key of data.finiteResources.keys()) {
                if (this.finiteResources.has(key)) {
                    controlledObjectMerge(this.finiteResources.get(key)!, data.finiteResources.get(key)!, ["currentValue", "maxValue"]);
                }
            }
        }

        if (data.clock) {
            controlledObjectMerge(this.clock, data.clock, ["timeStarted, time, timeHooks"]);
        }

        if (data.gameSystems) {
            for (const key of data.gameSystems.keys()) {
                if (this.gameSystems.has(key)) {
                    this.gameSystems.get(key)!.loadState?.(data.gameSystems.get(key)!);
                }
            }
        }
    }
}