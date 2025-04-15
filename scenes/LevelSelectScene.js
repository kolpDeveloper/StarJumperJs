class LevelSelectScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelSelectScene' });
    }
    
    preload() {
        this.load.image('levelBackground', 'assets/bg_grey.png');
    }
    
    create() {
        this.add.image(400, 300, 'levelBackground');
        this.add.text(400, 100, 'Выбери уровень', {
            fontSize: '30px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        const numLevels = 5;
        const buttonWidth = 150;
        const spacing = 15; 
        const totalWidth = numLevels * buttonWidth + (numLevels - 1) * spacing;
        const startX = 400 - totalWidth / 2 + buttonWidth / 2;

        for(let i = 0; i < numLevels; i++) {
            const levelButton = this.add.text(startX + i * (buttonWidth + spacing), 250, `Уровень ${i + 1}`, {
                fontSize: '16px',
                fill: '#ffffff',
                backgroundColor: '#f44336',
                padding: { left: 20, right: 20, top: 10, bottom: 10 }
            }).setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => levelButton.setStyle({fill: '#ff0'}))
            .on('pointerout', () => levelButton.setStyle({fill: '#ffffff'}))
            .on('pointerdown', () => this.scene.start('GameScene', {level: i + 1}));
        }
        
        var BackButton = this.add.text(400, 400, 'Назад', {
            fontSize: '24px',
            fill: '#ffffff',
            backgroundColor: '#4caf50',
            padding: { left: 20, right: 20, top: 10, bottom: 10 }
        }).setOrigin(0.5)
        .setInteractive({useHandCursor: true})
        .on('pointerover', () => BackButton.setStyle({fill: '#ff0'}))
        .on('pointerout', () => BackButton.setStyle({fill: '#ffffff'}))
        .on('pointerdown', () => this.scene.start('MainMenuScene'));
    }
}

export default LevelSelectScene;
