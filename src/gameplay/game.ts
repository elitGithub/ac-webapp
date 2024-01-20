import { controlledObjectMerge } from "../core/util/object";
import { EngineSystem, IEngineEvent } from "../engine";
import { FiniteResource } from "./finiteresource";
import { GameplaySystem } from "./gameplaysys";
import { Time, TimeProgression } from "./time";

export class BaseGame implements EngineSystem {
    finiteResources: Map<string, FiniteResource>;
    clock: Time;
    gameSystems: Map<string, GameplaySystem>;

    constructor(opts: any) {
        this.finiteResources = new Map<string, FiniteResource>;
        this.gameSystems = new Map<string, GameplaySystem>;
        this.clock = new Time(opts?.clockType??TimeProgression.MANUAL, opts?.clockSens);
    }

    createFiniteResource(name: string, maxValue: number): void {
        if (!this.finiteResources.has(name)) {
            this.finiteResources.set(name, new FiniteResource(maxValue));
        }
    }
    
    getFiniteResource<T extends FiniteResource = FiniteResource>(name: string): T|undefined {
        return this.finiteResources.get(name) as T;
    }

    registerGameSystem(name: string, system: GameplaySystem) {
        if (!this.gameSystems.has(name)) {
            this.gameSystems.set(name, system);
        }
    }

    getGameSystem<T extends EngineSystem = EngineSystem>(name: string): T|undefined {
        return this.gameSystems.get(name) as T;
    }

    getClock() {
        return this.clock;
    }

    queue(engineEvent: IEngineEvent): void {
        throw new Error("Method not implemented.");
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