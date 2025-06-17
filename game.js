import PreloaderScene from './scenes/PreloaderScene.js';
import MainMenuScene from './scenes/MainMenuScene.js';
import LevelSelectScene from './scenes/LevelSelectScene.js';
import SettingsScene from './scenes/SettingsScene.js';
import GameScene from './scenes/GameScene.js';
import WinScene from './scenes/WinScene.js';

document.addEventListener('DOMContentLoaded', function() {
    const isDebugMode = localStorage.getItem('debugMode') === 'true';
    
    const container = document.getElementById('game-container');
    const containerRect = container.getBoundingClientRect();

    let config = {
        type: Phaser.AUTO,
        width: containerRect.width,
        height: containerRect.height,
        parent: 'game-container',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: isDebugMode
            }
        },
        scene: [PreloaderScene, MainMenuScene, LevelSelectScene, SettingsScene, GameScene, WinScene]
    };
    
    let game = new Phaser.Game(config);
});