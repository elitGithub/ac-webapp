import { EngineSystem, IEngineEvent } from "../engine";
import { BaseEntity } from "../engine/coreentities";
import { FiniteResource } from "./finiteresource";
import { Time, TimeProgression } from "./time";

export class BaseGame implements EngineSystem {
    finiteResources: Map<string, FiniteResource>;
    clock: Time;
    gameSystems: Map<string, EngineSystem>;
    gameEntities: BaseEntity[];

    constructor(opts: any) {
        this.finiteResources = new Map<string, FiniteResource>;
        this.gameSystems = new Map<string, EngineSystem>;
        this.gameEntities = [];
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

    registerGameSystem(name: string, system: EngineSystem) {
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
}