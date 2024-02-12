import SceneFactory from '../../SceneFactory';

export default class BedroomScene extends SceneFactory {
    private background!: Phaser.GameObjects.Image;

    constructor() {
        super('bedroom');
    }

    create() {

        // Background image
        const bgWidth = this.scale.width;
        const bgHeight = this.scale.height;

        this.background = this.add.image(bgWidth / 2, bgHeight / 2, 'bedroom-background');
        this.background.setDisplaySize(bgWidth, bgHeight);

        // Closet
        const closetX = bgWidth / 2 + 943;
        const closetY = bgHeight / 2 + 332;
        const closet = this.add.rectangle(closetX, closetY, 50, 100, 0x999999);

        // Door
        const doorX = bgWidth / 2 + 735;
        const doorY = bgHeight / 2 + 445;
        const door = this.add.rectangle(doorX, doorY, 50, 100, 0x777777);

        // Carpet
        const carpetX = bgWidth / 2 + 255;
        const carpetY = bgHeight / 2 + 742;
        const carpet = this.add.image(carpetX, carpetY, 'carpet');

        // Bookshelf left
        const bookshelfLeftX = 300;
        const bookshelfLeftY = bgHeight / 2 + 60;
        const bookshelfLeft = this.add.image(bookshelfLeftX, bookshelfLeftY, 'bookshelf_left');


        // Background image
        const bg = this.add.image(0, -50, 'bedroom');

        // Bed
        const bed = this.add.image(530, 539, 'bed');
        bed.setDepth(1);
        // TV
        const tv = this.add.image(259, 730, 'tv');
        tv.setDepth(2);

        // Controller
        const controller = this.add.rectangle(280, 726, 50, 20, 0x333333);

        // Alarm
        const alarm = this.add.rectangle(305, 704, 20, 20, 0xFF0000);

        // Drawers
        const drawers = this.add.image(1420, 658, 'drawers');

        // Bookshelf right
        const bookshelfRight = this.add.image(1330, 32, 'bookshelf_right');

        // Desk
        const desk = this.add.image(1060, 564, 'desk');

        // Statuettes
        const statuettes = this.add.image(1534, 469, 'statuettes');

        // Flash drive
        const flashDrive = this.add.rectangle(1511, 650, 20, 10, 0x555555);

        // Computer
        const computer = this.add.rectangle(1143, 485, 100, 50, 0x777777);

    }

}
