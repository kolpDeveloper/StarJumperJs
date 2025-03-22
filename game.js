document.addEventListener('DOMContentLoaded', function() {
    let platforms;
    let player;
    let cursors;
    let stars;
    let score = 0;
    let scoreText;
    let bombs;
    let gameOver = false;




    class MainMenuScene extends Phaser.Scene{
        constructor(){
            super({key: 'MainMenuScene'})
        }
        preload(){
            this.load.image('menuBackground', 'assets/bg_grey.png');
        }

        create(){
            this.add.image(400,300, 'menuBackground');


            this.add.text(400, 100, 'Phaser platformer',{
                    fontSize: '64px',
                    fill: '#ffffff',
                    fontStyle: 'bold'
            }).setOrigin(0.5);


            const playButton = this.add.text(450,250,'Играть',{
                fontSize: '32px',
                fill: '#ffffff',
                backgroundColor: '#1e88e5',
                padding: {left: 20, right: 20, top: 10, bottom: 10}
            }).setOrigin(0.5)
            .setInteractive({useHandCursor:true })
                .on('pointerover', ()=>playButton.setStyle({fill: '#ff0'}))
                .on('pointerout', ()=>playButton.setStyle({fill: '#ffffff'}))
                .on('pointerdown', ()=>this.scene.start('LevelSelectScene'));



                const settingButton = this.add.text(450,350,'Настройки',{
                    fontSize: '32px',
                fill: '#ffffff',
                backgroundColor: '#1e88e5',
                padding: {left: 30, right: 30, top: 10, bottom: 10}
                }).setOrigin(0.5)
                .setInteractive({useHandCursor:true })
                    .on('pointerover', ()=>settingButton.setStyle({fill: '#ff0'}))
                    .on('pointerout', ()=>settingButton.setStyle({fill: '#ffffff'}))
                    .on('pointerdown', ()=>this.scene.start('SettingsScene'));
        }
    }


class LevelSelectScene extends Phaser.Scene{
            constructor() {
                super({ key: 'LevelSelectScene' });
            }
        
            preload() {
                this.load.image('levelBackground', 'assets/bg_grey.png');
            }

            create(){

                this.add.image(400,300, 'levelBackground');


                this.add.text(400, 100, 'Выбери уровень',{
                        fontSize: '30px',
                        fill: '#ffffff',
                        fontStyle: 'bold'
                }).setOrigin(0.5);

                const numLevels = 5;
                const buttonWidth = 150;
                const spacing = 15; 
                const totalWidth = numLevels * buttonWidth + (numLevels - 1) * spacing;
                const startX = 400 - totalWidth / 2 + buttonWidth / 2;

                for(let i = 0;i< numLevels;i++){
                    const levelButton = this.add.text(startX +  i * (buttonWidth + spacing), 250, `Уровень ${i + 1}`,{
                    fontSize: '16px',
                    fill: '#ffffff',
                    backgroundColor: '#f44336',
                    padding: { left: 20, right: 20, top: 10, bottom: 10 }
                    }).setOrigin(0.5)
                    .setInteractive({useHandCursor: true})
                    
                    .on('pointerover', ()=>levelButton.setStyle({fill: '#ff0'}))
                    .on('pointerout', ()=>levelButton.setStyle({fill: '#ffffff'}))
                    .on('pointerdown', ()=>this.scene.start('GameSpace', {level: i}));


                }
                const BackButton = this.add.text(400,400,'Назад',{
                    fontSize: '24px',
                    fill: '#ffffff',
                    backgroundColor: '#4caf50',
                    padding: { left: 20, right: 20, top: 10, bottom: 10 }
                }).setOrigin(0.5)
                .setInteractive({useHandCursor: true})
                    .on('pointerover', ()=>levelButton.setStyle({fill: '#ff0'}))
                    .on('pointerout', ()=>levelButton.setStyle({fill: '#ffffff'}))
                    .on('pointerdown', ()=>this.scene.start('MainMenuScene'));
                }

        } 



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
        
    

                this.add.text(350, 300, 'Telegram: t.me/usrlinux', {
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


class GameScene extends Phaser.Scene {
        constructor() {
            super({ key: 'GameScene' });
        }

        preload() {
            this.load.audio('backgroundMusic', 'assets/Honor.mp3');
            this.load.image('sky', 'assets/sky.png');
            this.load.image('ground', 'assets/platform.png');
            this.load.image('star', 'assets/star.png');
            this.load.image('bomb', 'assets/bomb.png');
            this.load.spritesheet('dude', 'assets/dude.png', {
                frameWidth: 32, frameHeight: 48
            });
        }
        
        create() {
            const music = this.sound.add('backgroundMusic');
            music.setLoop(true);
            music.setVolume(0.4);
            music.play();

            
            this.add.image(400, 300, 'sky');
            
            
            platforms = this.physics.add.staticGroup();
            platforms.create(400, 568, 'ground').setScale(2).refreshBody();
            platforms.create(600, 400, 'ground');
            platforms.create(50, 250, 'ground');
            platforms.create(750, 220, 'ground');
            
            
            player = this.physics.add.sprite(100, 450, 'dude');
            player.setBounce(0.2);
            player.setCollideWorldBounds(true);
            
            
            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
                frameRate: 10,
                repeat: -1,
            }); 
            
            this.anims.create({
                key: 'turn',
                frames: [{ key: 'dude', frame: 4 }],
                frameRate: 20,
            });
            
            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
                frameRate: 10,
                repeat: -1,
            });
            
            
            this.physics.add.collider(player, platforms);
            
            
            cursors = this.input.keyboard.createCursorKeys();
            
        
            stars = this.physics.add.group({
                key: 'star',
                repeat: 11,
                setXY: {x: 12, y: 0, stepX: 70},
            });
            
            stars.children.iterate((child) => {
                child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            });
            
    
            this.physics.add.collider(stars, platforms);
            
    
            this.physics.add.overlap(player, stars, this.collectStar, null, this);
            
    
            scoreText = this.add.text(16, 16, 'Score: 0', {
                fontSize: '32px',
                fill: '#ff0000',
            });
            
    
            bombs = this.physics.add.group();
            this.physics.add.collider(bombs, platforms);
            this.physics.add.collider(player, bombs, this.hitBomb, null, this);
        }
        
        update() {
            if(gameOver){
                window.location.reload();
            }   
            
            if(cursors.left.isDown){
                player.setVelocityX(-160);
                player.anims.play('left', true);
            }else if(cursors.right.isDown){
                player.setVelocityX(160);
                player.anims.play('right', true);
            }else{
                player.setVelocityX(0);
                player.anims.play('turn', true);
            }

            if(cursors.up.isDown && player.body.touching.down){
                player.setVelocityY(-330);
            }
        }
        
        collectStar(player, star) {
            star.disableBody(true, true);
            score += 10;
            scoreText.setText(`Score: ${score}`);

            if(stars.countActive(true) === 0){
                stars.children.iterate(child => {
                    child.enableBody(true, child.x, 0, true, true);
                });
                
                let x = (player.x < 400)
                    ? Phaser.Math.Between(400, 800)
                    : Phaser.Math.Between(0, 400);
                    
                let bomb = bombs.create(x, 16, 'bomb');
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            }
        }
        
        hitBomb(player, bomb) {
            this.physics.pause();
            player.setTint(0xff0000);
            player.anims.play('turn');
            gameOver = true;
        }
    }

    let config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    y: 300
                }
            }
        },
        scene: [MainMenuScene,LevelSelectScene,SettingsScene,GameScene]
    };

let game = new Phaser.Game(config);
});