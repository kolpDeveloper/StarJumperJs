class PreloaderScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloaderScene' });
    }
    
    preload() {
        this.loadAssets();
    }
    
    loadAssets() {
        this.load.audio('backgroundMusic', 'assets/Honor.ogg');
        
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 'assets/dude.png', {
            frameWidth: 32, frameHeight: 48
        });
        
        this.load.image('sky2', 'assets/moon_bg.png'); 
        this.load.image('ground2', 'assets/moon_sand.png'); 
        this.load.image('star2', 'assets/star.png'); 
        this.load.image('bomb2', 'assets/bomb.png'); 
        this.load.spritesheet('dude2', 'assets/dude.png', { 
            frameWidth: 32, frameHeight: 48
        });
        
        this.load.image('sky3', 'assets/cave.png'); 
        this.load.image('ground3', 'assets/stone.png'); 
        this.load.image('star3', 'assets/star.png'); 
        this.load.image('bomb3', 'assets/tnt.png'); 
        this.load.spritesheet('dude3', 'assets/dude.png', { 
            frameWidth: 32, frameHeight: 48
        });
        
        this.load.image('sky4', 'assets/rainbow_bg.png');
        this.load.image('ground4', 'assets/grass.png');
        this.load.image('star4', 'assets/star.png');
        this.load.image('bomb4', 'assets/watermelon.png');
        this.load.spritesheet('dude4', 'assets/dude.png', {
            frameWidth: 32, frameHeight: 48
        });
        
        this.load.image('sky5', 'assets/underwater_bg.png');
        this.load.image('ground5', 'assets/sand.png');
        this.load.image('star5', 'assets/star.png');
        this.load.image('bomb5', 'assets/bomb.png');
        this.load.spritesheet('dude5', 'assets/dude.png', {
            frameWidth: 32, frameHeight: 48
        });
        
        this.load.image('menuBackground', 'assets/mainMenuBg.png');
        this.load.image('levelBackground', 'assets/bg_grey.png');
        this.load.image('settingsBackground', 'assets/bg_grey.png');
    }
    
    create() {
        this.scene.start('MainMenuScene');
    }
}

export default PreloaderScene; 