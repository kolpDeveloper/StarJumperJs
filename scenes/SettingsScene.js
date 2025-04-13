class SettingsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SettingsScene' });
    }
    
    preload() {
        this.load.image('settingsBackground', 'assets/bg_grey.png');
    }
    
    create() {
        this.add.image(400, 300, 'settingsBackground');
        this.add.text(400, 100, 'Настройки', {
            fontSize: '40px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(350, 300, '\uD83C\uDDF0\uD83C\uDDFF', {
            fontSize: '18px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        const backButton = this.add.text(400, 400, 'Назад', {
            fontSize: '24px',
            fill: '#ffffff',
            backgroundColor: '#f44336',
            padding: { left: 20, right: 20, top: 10, bottom: 10 }
        }).setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => backButton.setStyle({ fill: '#ff0' }))
        .on('pointerout', () => backButton.setStyle({ fill: '#ffffff' }))
        .on('pointerdown', () => this.scene.start('MainMenuScene'));
    }
}

export default SettingsScene;
