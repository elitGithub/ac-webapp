export default abstract class PickyEmitter {

    interestedEventTypes: Function[];

    constructor(...types: Function[]) {
        this.interestedEventTypes = [];
        this.interestedEventTypes.push(...types);
    }

    interestedIn(event: any): boolean {
        if (this.interestedEventTypes.some(t => event instanceof t)) {
            return true;
        }

        return false;
    }

    onEventReceive(event: any): boolean {
        return true;
    }
}