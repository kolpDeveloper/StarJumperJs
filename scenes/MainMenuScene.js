class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({key: 'MainMenuScene'});
    }
    
    preload() {
        this.load.image('menuBackground', 'assets/mainMenuBg.png');
    }
    
    create() {
        this.add.image(400, 300, 'menuBackground');
        this.add.text(400, 100, 'Gold Leap', {
            fontSize: '64px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        const playButton = this.add.text(400, 250, 'Играть', {
            fontSize: '32px',
            fill: '#ffffff',
            backgroundColor: '#1e88e5',
            padding: {left: 20, right: 20, top: 10, bottom: 10}
        }).setOrigin(0.5)
        .setInteractive({useHandCursor: true})
        .on('pointerover', () => playButton.setStyle({fill: '#ff0'}))
        .on('pointerout', () => playButton.setStyle({fill: '#ffffff'}))
        .on('pointerdown', () => this.scene.start('LevelSelectScene'));

        const settingButton = this.add.text(400, 350, 'Настройки', {
            fontSize: '32px',
            fill: '#ffffff',
            backgroundColor: '#1e88e5',
            padding: {left: 30, right: 30, top: 10, bottom: 10}
        }).setOrigin(0.5)
        .setInteractive({useHandCursor: true})
        .on('pointerover', () => settingButton.setStyle({fill: '#ff0'}))
        .on('pointerout', () => settingButton.setStyle({fill: '#ffffff'}))
        .on('pointerdown', () => this.scene.start('SettingsScene'));
    }
}

export default MainMenuScene;
