import SceneFactory from 'Phaser/SceneFactory';

export default class HomeScene extends SceneFactory {
    constructor() {
        super('home');
    }

    preload() {
        // Load all possible Location backgrounds
        this.load.image('bedroom-background', 'assets/locations/home/bedroom/bedroom.webp');
        this.load.image('bathroom-background', 'assets/locations/home/bathroom/bathroom.webp');
        this.load.image('homehall-background', 'assets/locations/home/hall/homehall.webp');
        this.load.image('kitchen-background', 'assets/locations/home/kitchen/kitchen.webp');

        // Load all possible Location items and intractable items
        this.load.image('bed', 'assets/locations/home/bedroom/bed.webp');
        this.load.image('carpet', 'assets/locations/home/bedroom/carpet.webp');
        this.load.image('bookshelf_left', 'assets/locations/home/bedroom/bookshelve_left.webp');
        this.load.image('tv', 'assets/locations/home/bedroom/tv.webp');
        this.load.image('drawers', 'assets/locations/home/bedroom/drawers.webp');
        this.load.image('bookshelf_right', 'assets/locations/home/bedroom/bookshelves_right.webp');
        this.load.image('desk', 'assets/locations/home/bedroom/desk.webp');
        this.load.image('statuettes', 'assets/locations/home/bedroom/statuettes.webp');
    }

    create() {
        this.stateMachine.state.xRay.listenToXray(this);
    }

}
