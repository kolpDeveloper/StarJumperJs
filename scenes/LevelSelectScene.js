class LevelSelectScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelSelectScene' });
    }
    
    create() {
        this.add.image(400, 300, 'levelBackground');
        this.add.text(400, 100, 'Выбери уровень', {
            fontSize: '30px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        const numLevels = 5;
        const buttonWidth = 130;
        const buttonHeight = 50;
        const spacing = 20;
        const buttonsPerRow = 3;
        
        const startX = 400 - ((buttonWidth + spacing) * (buttonsPerRow - 1)) / 2;
        const startY = 200;

        for(let i = 0; i < numLevels; i++) {
            const row = Math.floor(i / buttonsPerRow);
            const col = i % buttonsPerRow;
            
            const x = startX + col * (buttonWidth + spacing);
            const y = startY + row * (buttonHeight + spacing);

            const levelButton = this.add.text(x, y, `Уровень ${i + 1}`, {
                fontSize: '14px',
                fill: '#ffffff',
                backgroundColor: '#f44336',
                padding: { left: 15, right: 15, top: 8, bottom: 8 }
            }).setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => levelButton.setStyle({fill: '#ff0'}))
            .on('pointerout', () => levelButton.setStyle({fill: '#ffffff'}))
            .on('pointerdown', () => this.scene.start('GameScene', {level: i + 1}));
        }
        
        var BackButton = this.add.text(400, 350, 'Назад', {
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
