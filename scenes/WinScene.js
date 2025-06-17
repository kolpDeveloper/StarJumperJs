import levelConfigs from '../levelConfigs.js';

class WinScene extends Phaser.Scene {
    constructor() {
        super({ key: 'WinScene' });
    }


    init(data){
        this.level = data.level;
        this.background = data.background;
    }


    create() {
        if (this.background) {
            const bg = this.add.image(400, 300, this.background);
            bg.setPipeline('Light2D'); 
            bg.setTint(0x808080);
        }

        
        if (this.background) {
            const blurredBg1 = this.add.image(400, 300, this.background);
            blurredBg1.setAlpha(0.4);
            blurredBg1.setTint(0x666666);
            blurredBg1.setScale(1.05);
            blurredBg1.setDepth(0);

        }
        
        this.add.text(400, 100, '🎉 Победа! 🎉', {
            fontSize: '48px',
            fill: '#00ff00',
            fontStyle: 'bold',
        }).setOrigin(0.5).setDepth(10);


        const restartButton = this.add.text(400,400, "Перезапуск",{
            fontSize: '28px',
            fill: '#ffffff',
            backgroundColor: '#0077cc',
            padding: { left: 20, right: 20, top: 10, bottom: 10 }
        }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .setDepth(10)
            .on('pointerover', () => restartButton.setStyle({ fill: '#ff0' }))
            .on('pointerout', () => restartButton.setStyle({ fill: '#ffffff' }))
            .on('pointerdown', () => {
                this.scene.start('GameScene', { level: this.level });
            });



            const toNextLevel = this.add.text(400,200,"Следующий уровень",{
                fontSize: '28px',
                fill: '#ffffff',
                backgroundColor: '#0077cc',
                padding: {left: 20, right: 20, top: 10, bottom: 10}
            }).setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .setDepth(10)
            .on('pointerover', () => toNextLevel.setStyle({ fill: '#ff0' }))
            .on('pointerout', () => toNextLevel.setStyle({ fill: '#ffffff' }))
            .on('pointerdown', () => { 
                const nextLevel = this.level + 1;
                
                if(nextLevel <= 5 && levelConfigs[nextLevel]){
                    this.scene.start('GameScene', { level: nextLevel });
                }else{
                    console.log("StartLevelException: Достигнут максимальный уровень");
                    this.scene.start('MainMenuScene');
                }
                
            });




        const toMainMenuButton = this.add.text(400,300, "Выход в главное меню",{
            fontSize: '28px',
            fill: '#ffffff',
            backgroundColor: '#0077cc',
            padding: { left: 20, right: 20, top: 10, bottom: 10 }
        }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .setDepth(10)
            .on('pointerover', () => toMainMenuButton.setStyle({ fill: '#ff0' }))
            .on('pointerout', () => toMainMenuButton.setStyle({ fill: '#ffffff' }))
            .on('pointerdown', () => {
                this.scene.start('MainMenuScene');
            });
    }
}


export default WinScene;
