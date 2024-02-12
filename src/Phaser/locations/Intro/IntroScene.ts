import TextContainerScene from '../../uiScenes/TextContainerScene';
import { BaseCharacter, gameText } from '../../types/types';
import {
    BLACK_HEX,
    BLACK_TEXT_COLOR,
    BUTTON_FONT_SIZE,
    BUTTON_TEXT_COLOR,
    COLUMNS,
    HOVER_COLOR_HEX,
    IDLE_COLOR_HEX,
    LIGHT_FONT,
    SMS_HEADER_CONFIG,
    TEXT_MESSAGE_CONTACT_NUMBER_CONFIG,
    TEXT_TIMESTAMP_CONFIG
} from '../../config';
import SceneFactory from '../../SceneFactory';
import Character from '../../GameState/Character';
import EventsManager from '../../util/EventsManager';

class IntroScene extends SceneFactory {

    private introTextData!: gameText;
    private background!: Phaser.GameObjects.Image;
    private buttonContainer!: Phaser.GameObjects.Container;
    readonly buttonConfig = {
        fontFamily: LIGHT_FONT,
        fontSize: BUTTON_FONT_SIZE,
        color: BUTTON_TEXT_COLOR,
        align: 'center'
    };
    private textContainerScene!: TextContainerScene;

    constructor() {
        super('introScene');
    }

    preload() {
        this.load.image('intro-background', '/assets/images/intro/bg.webp');
        this.load.json('intro-text', '/assets/text/intro/mc-monologue-intro.json');
        this.load.image('button-background', '/assets/ui/frame_button.webp');
        this.load.image('outgoing-text', '/assets/ui/dialog/frame_phone_say_bg_mc.webp');
        this.load.image('incoming-text', '/assets/ui/dialog/frame_phone_say_bg_alt_3.webp');
    }

    create() {
        const { width, height } = this.sys.game.canvas;
        // Add background image
        this.background = this.add.image(width / 2, height / 2, 'intro-background');
        this.background.setDisplaySize(this.scale.width, this.scale.height);
        const buttonBackground = this.add.sprite(0, 0, 'button-background');
        this.buttonContainer = this.add.container((width / COLUMNS) + width * 0.02, buttonBackground.height);
        this.buttonContainer.add(buttonBackground);
        const buttonLabel = this.add.text(0, 0, 'Skip intro', this.buttonConfig);
        buttonLabel.setOrigin(0.5, 0.5);
        buttonLabel.setInteractive();
        buttonLabel.setPosition(buttonBackground.x, 0);

        this.buttonContainer.add(buttonLabel);
        this.buttonContainer.setSize(buttonBackground.width, buttonBackground.height); // Set the size of the button container to match the button background
        // Load intro text data
        this.introTextData = this.cache.json.get('intro-text');
        this.addEventListeners({ buttonBackground, buttonLabel });

        this.textContainerScene = new TextContainerScene(this.introTextData);
        this.scene.add('scrolling-text', this.textContainerScene, true);
        this.initNewGameStates();
        this.stateMachine.state.xRay.listenToXray(this);
    }

    private initNewGameStates() {
        this.stateMachine.state.player.init();
        this.stateMachine.state.time.init();
        this.stateMachine.state.phone.installPhoneApp({ id: 'sms-app', name: 'Messages' }, true);
// TODO: move this entire block into a configurable object
        const hiddenNoConf: BaseCharacter = {
            id: 'hidden_number',
            name: 'Unknown',
            background: '',
            expression: '',
            position: 0,
            location: '',
            activity: '',
            equipment: [],
            inventory: [],
            love: 3,
            lust: 3,
            hidden_now: true,
            at_none_now: true,
            at_none_today: true,
            talk_limit_today: 1,
            flirt_limit_today: false,
            flirt_bonuses_chosen: false,
            icon: 'unknown_icon',
            phone_no: ''
        };
        const joConfig: BaseCharacter = {
            id: 'jo',
            name: 'Jo',
            background: '',
            expression: '',
            position: 0,
            location: '',
            activity: '',
            equipment: [],
            inventory: [],
            love: 3,
            lust: 3,
            hidden_now: true,
            at_none_now: true,
            at_none_today: true,
            talk_limit_today: 1,
            flirt_limit_today: false,
            flirt_bonuses_chosen: false,
            icon: 'jo_icon',
            phone_no: ''
        };

        const floraConfig: BaseCharacter = {
            id: 'flora',
            name: 'Flora',
            background: '',
            expression: '',
            position: 0,
            location: '',
            activity: '',
            equipment: [],
            inventory: [],
            love: 3,
            lust: 3,
            hidden_now: true,
            at_none_now: true,
            at_none_today: true,
            talk_limit_today: 1,
            flirt_limit_today: false,
            flirt_bonuses_chosen: false,
            icon: 'flora_icon',
            phone_no: ''
        };
        this.stateMachine.addState('hidden_number', new Character(EventsManager.getInstance(), hiddenNoConf));
        this.stateMachine.addState('jo', new Character(EventsManager.getInstance(), joConfig));
        this.stateMachine.addState('flora', new Character(EventsManager.getInstance(), floraConfig));
        this.stateMachine.state['hidden_number'].generatePhoneNumber();
        this.stateMachine.state['jo'].generatePhoneNumber();
        this.stateMachine.state['flora'].generatePhoneNumber();

        this.stateMachine.state.phone.addPhoneContact({
            id: 'hidden_number',
            name: this.stateMachine.state['hidden_number'].stats.name,
            number: this.stateMachine.state['hidden_number'].stats.phone_no
        }, true);
        this.stateMachine.state.phone.addPhoneContact({
            id: 'jo',
            name: this.stateMachine.state['jo'].stats.name,
            number: this.stateMachine.state['jo'].stats.phone_no
        }, true);
        this.stateMachine.state.phone.addPhoneContact({
            id: 'flora',
            name: this.stateMachine.state['flora'].stats.name,
            number: this.stateMachine.state['flora'].stats.phone_no
        }, true);
        // TODO: move this entire block into a configurable object
    }

    private addEventListeners(button: {
        buttonBackground: Phaser.GameObjects.Image;
        buttonLabel: Phaser.GameObjects.Text
    }) {

        const { buttonBackground, buttonLabel } = button;

        buttonLabel.on('pointerover', () => {
            buttonBackground.setTint(0xcccccc);
            this.game.canvas.style.cursor = 'pointer';
        });

        buttonLabel.on('pointerout', () => {
            buttonBackground.clearTint();
            this.game.canvas.style.cursor = 'default';
        });
        buttonBackground.on('pointerup', () => {
            // Emit the button click event with the button title
            this.skipIntroScene();
        });

        buttonLabel.on('pointerup', () => {
            // Emit the button click event with the button title
            this.skipIntroScene();
        });

        this.eventsManager.on('dialog-mode-scrolling-text', () => {
            this.stateMachine.state.phone.hidePhone(this);
        }, this);
        this.eventsManager.on('hide-phone-continue-text', () => {
            this.stateMachine.state.phone.hidePhone(this);
        }, this);
        this.eventsManager.on('add-text-message', (line) => {
            const contact: Character = this.stateMachine.state[line.speaker];
            this.stateMachine.state.phone.addMessageToConversation(contact, line.speaker, line.content, this.stateMachine.state.time, true)
        }, this);

    }

    private startGame() {
        this.eventsManager.emit('move-location', ['bedroom']);
        this.scene.stop();
        this.scene.start('home');
    }

    private skipIntroScene() {
        this.eventsManager.emit('move-location', ['bedroom']);
        this.eventsManager.emit('skip-intro', []);
        this.textContainerScene?.scene.stop();
        this.scene.stop('phoneScene');
        this.scene.stop('introScene');
    }

}

export default IntroScene;
