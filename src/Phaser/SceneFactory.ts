import EventsManager from './util/EventsManager';
import LayerManager from './util/LayerManager';
import StateMachine from './StateMachine';
import GraphicsHandler from './util/GraphicsHandler';
export default class SceneFactory extends Phaser.Scene {
    public eventsManager: EventsManager;
    public layerManager: LayerManager;
    public stateMachine: StateMachine;
    public graphicsHandler: GraphicsHandler;
    constructor(config?: string | Phaser.Types.Scenes.SettingsConfig) {
        super(config);
        this.eventsManager = EventsManager.getInstance();
        this.layerManager = new LayerManager();
        this.stateMachine = StateMachine.getInstance();
        this.graphicsHandler = new GraphicsHandler(this);
    }

}
