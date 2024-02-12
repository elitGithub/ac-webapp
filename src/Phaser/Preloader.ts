import SceneFactory from './SceneFactory';

class Preloader extends SceneFactory {
    constructor() {
        super('bootGame');
    }

    preload() {
        this.load.image('send_icon', '/assets/phone/apps/messages/send_icon.webp');
        this.load.image('unknown_icon', '/assets/characters/hidden_number/contact_icon.webp');
        this.load.image('flora_icon', '/assets/characters/flora/contact_icon.webp');
        this.load.image('jo_icon', '/assets/characters/jo/contact_icon.webp');
        this.load.image('bg_mask', '/assets/images/ui/main_menu/redesign/bg_mask.webp');
        this.load.image('game_menu_background', '/assets/gui/game_menu.png');
        this.load.image('choice-background', '/assets/images/ui/dialog/choice.webp');
        this.load.image('choice-background-hover', '/assets/images/ui/dialog/choice_hover.webp');
        this.load.image('choice-message', '/assets/images/ui/dialog/choice_message.webp');
        this.load.image('xray_mask', '/assets/ui/xray_mask.webp');
        this.load.image('next-line-arrow', '/assets/images/ui/dialog/ctc.webp');
        this.load.image('hide-ui-eye', '/assets/images/ui/hud/eye_open.webp');
        this.load.image('phone-background', '/assets/images/phone/bg.webp');
        this.load.image('arrow_back', '/assets/phone/apps/return_alt.webp');
        this.load.image('reveal_mask', '/assets/ui/xray_mask_inverted.webp');
    }

    create() {
        this.createNewGame();
    }

    private createNewGame() {
        this.scene.launch('mainMenu');
    }
}

export default Preloader;
