import { COLUMNS, ONE_SIXTH, ROLLING_TEXT_CONFIG } from '../config';
import SceneFactory from '../../Phaser/SceneFactory';
import { HudSceneTop } from './HudSceneTop';
import { HudSceneBottom } from './HudSceneBottom';
import GraphicsHandler from '../util/GraphicsHandler';
import TextHandler from '../util/TextHandler';
import { gameText } from '../types/types';

export default class TextContainerScene extends SceneFactory {
    private readonly hudSceneTop: HudSceneTop;
    private readonly hudSceneBottom: HudSceneBottom;
    private containerHeightRatio = ONE_SIXTH;
    private textHandler!: TextHandler;
    private isScrollingFinished: boolean = false;
    private containerKey: string = '';
    private container!: Phaser.GameObjects.Container;
    private readonly bottomContainerGradient = {
        topLeft: 0x412915,
        topRight: 0x412915,
        bottomLeft: 0x412915,
        bottomRight: 0x412915,
        alphaTopLeft: 0.3,
        alphaTopRight: 0.3,
        alphaBottomLeft: 2,
        alphaBottomRight: 2
    };
    private isSpaceKeyDown: boolean = false;
    constructor(private inputText: gameText) {
        super('scrolling-text');
        this.hudSceneTop = new HudSceneTop();
        this.hudSceneBottom = new HudSceneBottom();
    }

    preload() {
        this.inputText.forEach(node => {
            if (node.sound) {
                this.load.audio(node.sound, [`/assets/audio/sound/${node.sound}.ogg`, `/assets/audio/sound/${node.sound}.wav`]);
            }
        });
        this.load.image('next-line-arrow', '/assets/images/ui/dialog/ctc.webp');
        this.load.image('hide-ui-eye', '/assets/images/ui/hud/eye_open.webp');
    }

    create() {
        const gameHeight = this.sys.game.canvas.height;
        const gameWidth = this.sys.game.canvas.width;

        this.graphicsHandler = new GraphicsHandler(this);
        const {
            key,
            container
        } = this.graphicsHandler.createContainer(gameWidth, gameHeight, this.containerHeightRatio);
        this.containerKey = key;
        this.container = container;
        this.graphicsHandler.createGradient(this.containerKey, this.bottomContainerGradient);

        this.textHandler = new TextHandler(this, this.inputText, this.hudSceneBottom, this.eventsManager);
        this.scene.add('hud-bottom', this.hudSceneBottom, true);
        const textObject = this.textHandler.initializeText(gameWidth, ROLLING_TEXT_CONFIG);
        this.container.add(textObject);

        this.textHandler.showNextLine(); // Start the first line
        this.updateContainer();
        this.addEventListeners();
    }

    private updateContainer() {
        const gameHeight = this.sys.game.canvas.height;
        this.graphicsHandler.updateContainerPosition(this.containerKey, gameHeight, this.containerHeightRatio);

        const textX = this.sys.game.canvas.width / COLUMNS; // Start one column to the side.
        const textY = this.graphicsHandler.containers[this.containerKey].height * 0.15;  // Slightly below
        this.textHandler.updateTextPosition(textX, textY);
    }

    private addEventListeners() {
        this.input.on('pointerup', () => {
            if (this.isScrollingFinished) {
                this.eventsManager.emit('advance-scene');
            } else {
                this.textHandler.finishLine();
            }
        });

        this.input?.keyboard?.on('keydown-CTRL', () => {
            this.textHandler.skipLine();
        });

        this.input?.keyboard?.on('keydown-SPACE', () => {
            if (!this.isSpaceKeyDown) {
                // Set the flag to true only on the initial key press.
                this.isSpaceKeyDown = true;

                if (this.isScrollingFinished) {
                    this.eventsManager.emit('advance-scene');
                } else {
                    this.textHandler.finishLine();
                }
            }
        });
        this.eventsManager.on('text-finished-scrolling', () => {
            this.isScrollingFinished = true;
            this.container.destroy();
        }, this);

        this.eventsManager.on('dialog-mode-phone-messages', () => {
            this.container.setVisible(false);
        }, this);

        this.input?.keyboard?.on('keyup-SPACE', () => {
            // Reset the flag when the SPACE key is released.
            this.isSpaceKeyDown = false;
        });

    }
}
