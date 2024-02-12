import Phaser from 'phaser';
// TODO: add dynamic config so different games can be loaded
import Preloader from './Preloader';
import MainMenuScene from './MainMenuScene';
import IntroScene from './locations/Intro/IntroScene';
import { GAME_HEIGHT, GAME_WIDTH } from './config';

const gameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'phaser-container',
    title: 'Another Chance - A time travel tale',
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    backgroundColor: '#282c34',
    expandParent: true,
    disableContextMenu: true,
    scene: [
        Preloader,
        MainMenuScene,
        IntroScene,
        // Here will be the scene constants from upwards
    ], plugins: [],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

export default gameConfig;
