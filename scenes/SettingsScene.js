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

        const isDebugMode = localStorage.getItem('debugMode') === 'true';
        
        this.add.text(250, 250, 'Debug Mode:', {
            fontSize: '24px',
            fill: '#ffffff'
        }).setOrigin(0, 0.5);
        
        const checkboxBg = this.add.rectangle(450, 250, 30, 30, 0x333333)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });
            
        const checkmark = this.add.text(450, 250, '✓', {
            fontSize: '24px',
            fill: '#4caf50'
        }).setOrigin(0.5);
        
        checkmark.setVisible(isDebugMode);
        
        const restartMessage = this.add.text(400, 350, 'Перезапустите игру для применения настроек', {
            fontSize: '16px',
            fill: '#ff9900'
        }).setOrigin(0.5).setVisible(false);
        
        checkboxBg.on('pointerdown', () => {
            const newDebugMode = !checkmark.visible;
            checkmark.setVisible(newDebugMode);
            localStorage.setItem('debugMode', newDebugMode);    
            restartMessage.setVisible(true);
        });

        const backButton = this.add.text(400, 400, 'Назад', {
            fontSize: '24px',
            fill: '#ffffff',
            backgroundColor: '#4caf50',
            padding: { left: 20, right: 20, top: 10, bottom: 10 }
        }).setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => backButton.setStyle({ fill: '#ff0' }))
        .on('pointerout', () => backButton.setStyle({ fill: '#ffffff' }))
        .on('pointerdown', () => this.scene.start('MainMenuScene'));
    }
}

export default SettingsScene;
