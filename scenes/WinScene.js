class WinScene extends Phaser.Scene {
    constructor() {
        super({ key: 'WinScene' });
    }


    init(){
        this.level = data.level;
    }


    create() {
        this.add.text(400, 200, '🎉 Победа! 🎉', {
            fontSize: '48px',
            fill: '#00ff00',
            fontStyle: 'bold',
        }).setOrigin(0.5);


        const restartButton = this.add.text(400,400, "Перезапуск",{
            fontSize: '28px',
            fill: '#ffffff',
            backgroundColor: '#0077cc',
            padding: { left: 20, right: 20, top: 10, bottom: 10 }
        }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => restartButton.setStyle({ fill: '#ff0' }))
            .on('pointerout', () => restartButton.setStyle({ fill: '#ffffff' }))
            .on('pointerdown', () => {

                const levelKey = levelConfigs[this.level];
                this.scene.start(levelKey);
            
            });



            const toNextLevel = this.add.text(400,200,"Следующий уровень",{
                fontSize: '28px',
                fill: '#ffffff',
                backgroundColor: '#0077cc',
                padding: {left: 20, right: 20, top: 10, bottom: 10}
            }).setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => toNextLevel.setStyle({ fill: '#ff0' }))
            .on('pointerout', () => toNextLevel.setStyle({ fill: '#ffffff' }))
            .on('pointerdown', () => { 

                const levelKey = levelConfigs[this.level];
                
                if(levelKey <= 5){
                    this.scene.start(levelKey);
                }else{
                    console.log("StartLevelException");
                }
                
            });




        const toMainMenuButton = this.add.text(400,300, "Выход в главное меню",{
            fontSize: '28px',
            fill: '#ffffff',
            backgroundColor: '#0077cc',
            padding: { left: 20, right: 20, top: 10, bottom: 10 }
        }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => toMainMenuButton.setStyle({ fill: '#ff0' }))
            .on('pointerout', () => toMainMenuButton.setStyle({ fill: '#ffffff' }))
            .on('pointerdown', () => {
                this.scene.start('MainMenuScene');
            });
    }
}


export default WinScene;