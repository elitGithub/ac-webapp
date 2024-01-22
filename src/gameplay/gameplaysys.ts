import { EngineSystem, IEngineEvent, RestoreState} from "../engine";

export class GameplaySystem implements EngineSystem, RestoreState {

    queue(engineEvent: IEngineEvent): void {

    }

    update(time: number): void {
        
    }

    loadState?(data: Object): void {
        
    }
}