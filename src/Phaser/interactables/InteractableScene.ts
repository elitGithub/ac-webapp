import SceneFactory from '../SceneFactory';

export default class InteractableScene extends SceneFactory {
    private config;
    constructor(config: any) {
        super();
        this.config = config;
    }

    preload(){
        this.load.image(this.config.backgroundKey, this.config.backgroundPath);
    }

    create() {
        this.addContainers();
    }

    addContainers() {
        this.config.interactables.forEach((interactable: any) => {
            let newContainer = this.add.container(
                interactable.calcX(this),
                interactable.calcY(this)
            );
            newContainer.setName(interactable.key);
            interactable.initialContainer(this, newContainer);
        });
    }
}
