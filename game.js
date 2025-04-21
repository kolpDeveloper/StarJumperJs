import MainMenuScene from './scenes/MainMenuScene.js';
import LevelSelectScene from './scenes/LevelSelectScene.js';
import SettingsScene from './scenes/SettingsScene.js';
import GameScene from './scenes/GameScene.js';

document.addEventListener('DOMContentLoaded', function() {
    
    let config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                
                
            }
        },
        scene: [MainMenuScene, LevelSelectScene, SettingsScene, GameScene]
    };

    let game = new Phaser.Game(config);
});