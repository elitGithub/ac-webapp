import { EngineSystem, IEngineEvent } from "../engine";
import { FiniteResource } from "./finiteresource";
import { Time, TimeProgression } from "./time";

export class BaseGame implements EngineSystem{
    finiteResources: Map<string, FiniteResource>;
    clock: Time;

    constructor(opts: any) {
        this.finiteResources = new Map<string, FiniteResource>;
        this.clock = new Time(opts?.clockType??TimeProgression.MANUAL, opts?.clockSens);
    }

    createFiniteResource(name: string, maxValue: number): void {
        if (!this.finiteResources.has(name)) {
            this.finiteResources.set(name, new FiniteResource(maxValue));
        }
    }
    
    getFiniteResource(name: string): FiniteResource|undefined {
        return this.finiteResources.get(name);
    }

    queue(engineEvent: IEngineEvent): void {
        throw new Error("Method not implemented.");
    }

    update(time: number): void {
        this.clock.simulatedTimeUpdate(time);
    }
}