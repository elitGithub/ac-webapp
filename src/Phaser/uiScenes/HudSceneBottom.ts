import { ONE_SIXTH } from '../config';
import SceneFactory from '../SceneFactory';

export class HudSceneBottom extends SceneFactory {
    private arrow!: Phaser.GameObjects.Image;
    private arrowSpeed: number = 1000;

    private eye!: Phaser.GameObjects.Image;
    private hideUIText!: Phaser.GameObjects.Text;

    constructor() {
        super('hud-bottom');
    }

    create() {
        const gameWidth = this.sys.game.canvas.width;
        const gameHeight = this.sys.game.canvas.height;
        const hudPositionBottom = gameHeight - (gameHeight * ONE_SIXTH) + ((gameHeight * ONE_SIXTH) / 2);
        // Add arrow image
        this.arrow = this.add.sprite(0, 0, 'next-line-arrow');
        const arrowMinX = gameWidth - (this.arrow.width * 2); // Adjust the minimum X position for the arrow

        // Create the arrow animation
        this.tweens.add({
            targets: this.arrow,
            x: arrowMinX,
            duration: this.arrowSpeed, // Adjust the duration for slower speed
            repeat: -1,
            yoyo: true
        });

        // Add eye image
        this.eye = this.add.sprite(0, 0, 'hide-ui-eye');
        this.eye.setOrigin(0, 0);
        this.eye.setPosition(this.eye.width / 2, hudPositionBottom + 30);
        this.arrow.setPosition(gameWidth, hudPositionBottom);
        // Add "hide ui" text
        this.hideUIText = this.add.text(0, 0, 'Hide UI', { fontFamily: 'Arial', fontSize: '24px', color: '#ffffff' });
        this.hideUIText.setOrigin(0, 0);
        this.hideUIText.setPosition(this.eye.x + this.eye.width + 10, hudPositionBottom + 32);

        // Hide the text initially
        this.hideUIText.setVisible(false);
        this.eye.setInteractive();

        this.eye.on('pointerover', () => {
            this.eye.setTint(0xffffff);
            this.game.canvas.style.cursor = 'pointer'; // Set cursor to pointer on hover
        });

        this.eye.on('pointerout', () => {
            this.eye.clearTint();
            this.game.canvas.style.cursor = 'default'; // Reset cursor to default on exit
        });

        this.addEventListeners();
    }


    public addEventListeners() {
        this.eye.on('pointerover', () => {
            this.eye.setTint(0xffffff);
            this.hideUIText.setVisible(true);
            this.game.canvas.style.cursor = 'pointer'; // Set cursor to pointer on hover
        });

        this.eye.on('pointerout', () => {
            this.eye.clearTint();
            this.hideUIText.setVisible(false);
            this.game.canvas.style.cursor = 'default'; // Reset cursor to default on exit
        });
    }


    public handleEyeClick() {}

    public hideEye() {
        this.eye.setVisible(false);
    }

    public hideArrow() {
        this.arrow.setVisible(false);
    }

    public showEye() {
        this.eye.setVisible(true);
    }

    public showArrow() {
        this.arrow.setVisible(true);
    }
}
