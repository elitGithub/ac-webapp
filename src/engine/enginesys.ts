type IEngineEvent = {

}

interface EngineSystem {
    queue(engineEvent: IEngineEvent): void;
    update(time: number): void;
}