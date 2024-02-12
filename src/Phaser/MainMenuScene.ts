import MenuButtonsScene from './MenuButtonsScene';
import SceneFactory from './SceneFactory';
import Xray from './Xray';

export default class MainMenuScene extends SceneFactory {
    private background!: Phaser.GameObjects.Image;
    readonly backgrounds: string[] = [
        'main_menu_0',
        'main_menu_1',
        'main_menu_2',
        'main_menu_3',
        'main_menu_4'
    ];
    private currentBackgroundIndex!: number;
    private rayOverlay!: Phaser.GameObjects.Image;
    private strips!: Phaser.GameObjects.Image;
    private logo!: Phaser.GameObjects.Image;
    showDemoSpriteScene: Xray | undefined;
    readonly logoOffset = 20;

    constructor() {
        super('mainMenu');
    }

    preload() {
        this.load.image('ray_overlay', '/assets/images/ui/main_menu/redesign/ray_overlay.webp');
        this.load.image('strip_bottom', '/assets/images/ui/main_menu/redesign/strip_bottom.webp');
        this.load.image('strip_top', '/assets/images/ui/main_menu/redesign/strip_top.webp');
        this.load.image('strips', '/assets/images/ui/main_menu/redesign/strips.webp');
        this.load.image('team_logo', '/assets/images/ui/main_menu/redesign/team_and_game_logos.webp');
        this.load.image('team_logo_cut', '/assets/images/ui/main_menu/redesign/team_and_game_logos_cut.webp');
        this.load.image('main_menu_0', '/assets/images/ui/main_menu/moving-images/main_menu_0.webp');
        this.load.image('main_menu_1', '/assets/images/ui/main_menu/moving-images/main_menu_1.webp');
        this.load.image('main_menu_2', '/assets/images/ui/main_menu/moving-images/main_menu_2.webp');
        this.load.image('main_menu_3', '/assets/images/ui/main_menu/moving-images/main_menu_3.webp');
        this.load.image('main_menu_4', '/assets/images/ui/main_menu/moving-images/main_menu_4.webp');
        this.load.image('main_menu_background', '/assets/gui/main_menu.png');
        this.load.image(
          'sprite_clothed',
          '/assets/images/ui/main_menu/sprite-image/sprite_clothed.webp'
        );
        this.load.image(
          'sprite_nude',
          '/assets/images/ui/main_menu/sprite-image/sprite_nude.webp'
        );
    }

    create() {
        this.addRotatingBackGrounds();
        this.addOverlayAndLogos();
        // Create an instance of the ShowDemoSpriteScene
        // this.showDemoSpriteScene = new ShowDemoSpriteScene();


      this.showDemoSpriteScene = new Xray([
        {layer: 'clothed', key: 'sprite_clothed', url:  '/assets/images/ui/main_menu/sprite-image/sprite_clothed.webp', action: 'make'},
        {layer: 'nude', key: 'sprite_nude', url:  '/assets/images/ui/main_menu/sprite-image/sprite_nude.webp', action: 'add'},
      ], {x: 1440, y:540});

        const menuButtonsScene = new MenuButtonsScene();
        // Add the ShowDemoSpriteScene to the scene manager
        this.scene.add('show-demo-sprite', this.showDemoSpriteScene, true);
        this.scene.add('main-menu-buttons', menuButtonsScene, true);
        this.listenToMenuButtons();
        this.listenToKeyBoardInput();
    }

    private addRotatingBackGrounds() {
        this.currentBackgroundIndex = 0;

        // Create the background image
        this.background = this.add.image(0, 0, this.backgrounds[0]).setOrigin(0);
        this.background.setScrollFactor(0); // Ensure the background doesn't scroll with the camera

        // Call the transitionBackground method every 5 seconds
        this.time.addEvent({
            delay: 5000,
            loop: true,
            callback: this.transitionBackground,
            callbackScope: this
        });
    }

    private addOverlayAndLogos() {
        this.rayOverlay = this.add.image(0, 0, 'ray_overlay').setOrigin(0);
        this.rayOverlay.setAlpha(0.5);
        this.rayOverlay.setDepth(this.layerManager.layers.firstLayerDepth);
        this.tweens.add({
            targets: this.rayOverlay,
            alpha: 0.3,
            duration: 3500, // 1.5 seconds
            yoyo: true,
            repeat: -1
        });

        this.tweens.add({
            targets: this.rayOverlay,
            alpha: 0.6,
            duration: 1500, // 1.5 seconds
            yoyo: true,
            repeat: -1
        });

        this.tweens.add({
            targets: this.rayOverlay,
            alpha: 0.9,
            duration: 1400, // 1.5 seconds
            yoyo: true,
            repeat: -1
        });
        // Add the strips, logo, and clothed_sprite (adjust the positions as needed)
        this.strips = this.add.image(0, 0, 'strips');
        this.strips.setOrigin(0);
        this.strips.setDepth(this.layerManager.layers.secondLayerDepth);
        this.logo = this.add.image(this.logoOffset, 0, 'team_logo').setOrigin(0);
        this.logo.setDepth(this.layerManager.layers.secondLayerDepth);
    }

    private transitionBackground() {
        const nextBackgroundIndex = (this.currentBackgroundIndex + 1) % this.backgrounds.length;
        const nextBackgroundTexture = this.backgrounds[nextBackgroundIndex];

        const nextBackground = this.add.image(0, 0, nextBackgroundTexture).setOrigin(0);
        nextBackground.setDisplaySize(this.scale.width, this.scale.height);
        nextBackground.setAlpha(0);
        nextBackground.setDepth(this.layerManager.layers.baseLayer); // Set depth to 0, behind other game objects
        // Adjust the depth of other game objects
        this.background.setDepth(this.layerManager.layers.firstLayerDepth);

        this.tweens.add({
            targets: this.background,
            alpha: 0,
            duration: 500,
            onComplete: () => {
                this.background.destroy();
                this.background = nextBackground;
            }
        });

        this.tweens.add({
            targets: nextBackground,
            alpha: 1,
            duration: 500
        });

        this.currentBackgroundIndex = nextBackgroundIndex;
    }

    private listenToMenuButtons() {
        const menuButtonsScene = this.scene.get('main-menu-buttons') as MenuButtonsScene;
        menuButtonsScene.events.on('buttonClick', (buttonTitle: Phaser.GameObjects.Text) => {
            const title = buttonTitle.text;
            switch (title) {
                case 'New Game':
                    this.startNewGame();
                    break;
                case 'Chapter Select':
                    this.openChapterSelect();
                    break;
                case  'Tips & Tricks':
                    this.showTipsAndTricks();
                    break;
                case 'Load Game':
                    this.loadGame();
                    break;
                case 'Settings':
                    this.openSettings();
                    break;
                case 'Credits':
                    this.showCredits();
                    break;
                default:
                    return;
            }
        });
    }

    private startNewGame() {
        const fadeOutDuration = 1000; // Adjust the duration as needed
        const fadeInDuration = 1000; // Adjust the duration as needed
        this.scene.stop('main-menu-buttons');
        this.scene.stop('show-demo-sprite');
        // Flag to track whether the fade-out animation has completed
        let fadeOutComplete = false;

        // Fade out the child scenes
        const menuButtonsScene = this.scene.get('main-menu-buttons') as MenuButtonsScene;

        // Fade out the main menu buttons scene
        this.tweens.add({
            targets: menuButtonsScene.cameras.main,
            alpha: 0,
            duration: fadeOutDuration,
            onComplete: () => {
                // Stop the main menu buttons scene
                this.scene.stop('main-menu-buttons');
                this.scene.remove('main-menu-buttons');
                checkFadeOutComplete();
            }
        });

        // Fade out the show demo sprite scene
        this.tweens.add({
            targets: this.showDemoSpriteScene?.cameras.main,
            alpha: 0,
            duration: fadeOutDuration,
            onComplete: () => {
                // Stop the show demo sprite scene
                this.scene.stop('show-demo-sprite');
                this.scene.remove('show-demo-sprite');
                checkFadeOutComplete();
            }
        });

        // Create a fade-out effect for the main menu scene by gradually decreasing its alpha
        this.cameras.main.fadeOut(fadeOutDuration, 0, 0, 0, (camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
            // Adjust the alpha of the main menu scene based on the fade-out progress
            const alpha = 1 - progress;
            this.cameras.main.setAlpha(alpha);
            if (progress === 1) {
                // The fade-out animation has completed
                fadeOutComplete = true;
                checkFadeOutComplete();
            }
        });

        // Function to check if the fade-out animation has completed and start the IntroScene
        const checkFadeOutComplete = () => {
            if (fadeOutComplete) {
                // Fade in the main menu scene along with the IntroScene
                this.scene.start('introScene');
                this.cameras.main.fadeIn(fadeInDuration);
            }
        };
    }


    private openChapterSelect() {
        // Handle 'Chapter Select' button click
        // ...
    }

    private showTipsAndTricks() {
        // Handle 'Tips & Tricks' button click
        // ...
    }

    private loadGame() {
        // Handle 'Load Game' button click
        // ...
    }

    private openSettings() {
        // Handle 'Settings' button click
        // ...
    }

    private showCredits() {
        // Handle 'Credits' button click
        // ...
    }

    private listenToKeyBoardInput() {
        this.stateMachine.state.xRay.listenToXray(this);
        this.input?.keyboard?.on('keydown-N', () => {
            this.startNewGame();
        });
    }
}
