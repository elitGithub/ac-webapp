import EventsManager from '../util/EventsManager';

export default class XrayManager {
    private xRayState: 'full' | 'partial' | 'off';
    constructor(private eventsManager: EventsManager) {
        this.xRayState = 'off';
    }
    public listenToXray(scene: Phaser.Scene) {
        scene.input?.keyboard?.on('keydown-X', () => {
            if (this.xRayState === 'off') {
                this.xRay = 'partial';
            }

            if (this.xRayState === 'partial') {
                this.xRay = 'full';
            }

            if (this.xRayState === 'full') {
                this.xRay = 'off';
            }
        });
    }

    set xRay(state: 'full' | 'partial' | 'off') {
        this.xRayState = state;
    }
}
