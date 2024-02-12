import { BUTTON_FONT_SIZE, COLUMNS, MAIN_MENU_BUTTONS } from './config';
import SceneFactory from './SceneFactory';

export default class MenuButtonsScene extends SceneFactory {
    private readonly topMostLayer: number;

    constructor() {
        super('main-menu-buttons');
        this.topMostLayer = this.layerManager.topMostLayer;
    }

    private buttons = ['New Game', 'Chapter Select', 'Tips & Tricks', 'Load Game', 'Settings', 'Credits'];
    private buttonHeight!: number;
    private buttonSpacing = 0.05; // Adjust this value to change the spacing between buttons
    private buttonContainer!: Phaser.GameObjects.Container;

    preload() {
        this.load.image('button-background', '/assets/images/ui/frame_button.webp');
    }
    create() {
        const { width, height } = this.sys.game.canvas;

        // Calculate button dimensions and spacing based on screen size
        this.buttonHeight = height * 0.08;  // Adjust the percentage value as needed
        const buttonCount = this.buttons.length;
        this.buttonContainer = this.add.container((width / COLUMNS) + width * 0.01, height / 2 + height * 0.05);

        this.buttons.forEach((title, index) => {
            const buttonContainer = this.add.container(0, index * (this.buttonHeight + this.buttonSpacing));
            this.buttonContainer.add(buttonContainer);

            const buttonBackground = this.add.sprite(0, 0, 'button-background');
            buttonContainer.add(buttonBackground);

            const buttonLabel = this.add.text(0, 0, title, MAIN_MENU_BUTTONS);
            buttonLabel.setOrigin(0.5, 0.5);
            buttonLabel.setInteractive();
            buttonLabel.setPosition(buttonBackground.x, 0);
            buttonContainer.add(buttonLabel);
            buttonContainer.setSize(buttonBackground.width, buttonBackground.height); // Set the size of the button container to match the button background

            const button = { buttonBackground, buttonLabel };
            this.setupButtonEvents(button);
        });

        // Adjust the position of the button container within the main container
        this.buttonContainer.y -= (buttonCount - 1) * (this.buttonHeight + this.buttonSpacing) / COLUMNS;
        this.buttonContainer.setDepth(this.topMostLayer);


        // Listen for the window resize event and update the text size
        window.addEventListener('resize', () => {
            const { width, height } = this.sys.game.canvas;
            this.buttonHeight = height * 0.08;  // Adjust the percentage value as needed
            this.buttonContainer.each((buttonContainer: Phaser.GameObjects.Container) => {
                const buttonLabel = buttonContainer.getAt(2) as Phaser.GameObjects.Text;
                buttonLabel.setFontSize(BUTTON_FONT_SIZE);
            });
        });
    }


    private emitButtonClickEvent(buttonTitle: Phaser.GameObjects.Text) {
        this.events.emit('buttonClick', buttonTitle);
    }

    private setupButtonEvents(button: {
        buttonBackground: Phaser.GameObjects.Image;
        buttonLabel: Phaser.GameObjects.Text
    }) {
        const { buttonBackground, buttonLabel } = button;

        buttonLabel.on('pointerover', () => {
            buttonBackground.setTint(0xcccccc);
            this.game.canvas.style.cursor = 'pointer'; // Set cursor to pointer on hover
        });

        buttonBackground.on('pointerover', () => {
            buttonBackground.setTint(0xcccccc);
            this.game.canvas.style.cursor = 'pointer'; // Set cursor to pointer on hover
        });

        buttonLabel.on('pointerout', () => {
            buttonBackground.clearTint();
            this.game.canvas.style.cursor = 'default'; // Reset cursor to default on exit
        });

        buttonBackground.on('pointerout', () => {
            buttonBackground.clearTint();
            this.game.canvas.style.cursor = 'default'; // Reset cursor to default on exit
        });
        buttonBackground.on('pointerup', () => {
            // Emit the button click event with the button title
            this.emitButtonClickEvent(buttonLabel);
        });

        buttonLabel.on('pointerup', () => {
            // Emit the button click event with the button title
            this.emitButtonClickEvent(buttonLabel);
        });
    }
}
