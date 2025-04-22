class WinScene extends Phaser.Scene {
    constructor() {
        super({ key: 'WinScene' });
    }

    create() {
        this.add.text(400, 200, '🎉 Победа! 🎉', {
            fontSize: '48px',
            fill: '#00ff00',
            fontStyle: 'bold',
        }).setOrigin(0.5);



        const restartButton = this.add.text(400,400, "Restart",{
            fontSize: '28px',
            fill: '#ffffff',
            backgroundColor: '#0077cc',
            padding: { left: 20, right: 20, top: 10, bottom: 10 }
        }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => restartButton.setStyle({ fill: '#ff0' }))
            .on('pointerout', () => restartButton.setStyle({ fill: '#ffffff' }))
            .on('pointerdown', () => {
                this.scene.start('MainMenuScene');
            });
    }
}

export default WinScene;