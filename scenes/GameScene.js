import levelConfigs from '../levelConfigs.js';

class GameScene extends Phaser.Scene {

    platforms = null;
    player = null;
    cursors = null;
    stars = null;
    score = 0;
    scoreText = null;
    bombs = null;
    gameOver = false;
    escKey = null;
    
    
    keyW = null;
    keyA = null;
    keyS = null;
    keyD = null;
    
    
    levelConfig = null;
    
    constructor() {
        super({ key: 'GameScene' });
        
        this.handleEsc = this.handleEsc.bind(this);
    }
    
    preload() {
        
        this.load.audio('backgroundMusic', 'assets/Honor.ogg');
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 'assets/dude.png', {
            frameWidth: 32, frameHeight: 48
        });
        
        
        this.load.image('sky2', 'assets/sky.png'); 
        this.load.image('ground2', 'assets/platformgress.png'); 
        this.load.image('star2', 'assets/star.png'); 
        this.load.image('bomb2', 'assets/bomb.png'); 
        this.load.spritesheet('dude2', 'assets/dude.png', { 
            frameWidth: 32, frameHeight: 48
        });
        
        this.load.image('sky3', 'assets/sky.png'); 
        this.load.image('ground3', 'assets/platform.png'); 
        this.load.image('star3', 'assets/star.png'); 
        this.load.image('bomb3', 'assets/bomb.png'); 
        this.load.spritesheet('dude3', 'assets/dude.png', { 
            frameWidth: 32, frameHeight: 48
        });
        
        this.load.image('sky4', 'assets/sky.png');
        this.load.image('ground4', 'assets/platform.png');
        this.load.image('star4', 'assets/star.png');
        this.load.image('bomb4', 'assets/bomb.png');
        this.load.spritesheet('dude4', 'assets/dude.png', {
            frameWidth: 32, frameHeight: 48
        });
        
        
        this.load.image('sky5', 'assets/sky.png');
        this.load.image('ground5', 'assets/platform.png');
        this.load.image('star5', 'assets/star.png');
        this.load.image('bomb5', 'assets/bomb.png');
        this.load.spritesheet('dude5', 'assets/dude.png', {
            frameWidth: 32, frameHeight: 48
        });
    }
    
    init(data) {
        this.level = data.level || 1;
        
        
        this.levelConfig = levelConfigs[this.level];
        
        !this.levelConfig ? console.warn(`Конфигурация для уровня ${this.level} не найдена. Используем уровень 1.`) : null;
    }
    
    handleEsc() {
        if (this.music) { 
            this.music.stop();
        }
        this.scene.start('MainMenuScene');
    }
    
    create() {
        this.score = 0;        
        this.gameOver = false; 
        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        
        
    
        if (!this.music || !this.music.isPlaying) { 
            this.music = this.sound.add(this.levelConfig.assets.music || 'backgroundMusic');
            this.music.setLoop(true);
            this.music.setVolume(0.2);
            this.music.play();
        }
        
        
        if (this.levelConfig && this.levelConfig.backgroundColor) {
            this.cameras.main.setBackgroundColor(this.levelConfig.backgroundColor);
            this.add.image(400, 300, this.levelConfig.assets.background || 'sky').setTint(this.levelConfig.backgroundColor);
        } else {
            this.add.image(400, 300, this.levelConfig.assets.background || 'sky');
        }
        
        
        this.platforms = this.physics.add.staticGroup();
        
        
        this.createPlatformsForLevel();
        
        
        this.player = this.physics.add.sprite(100, 450, this.levelConfig.assets.player || 'dude');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        
        
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers(this.levelConfig.assets.player || 'dude', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: this.levelConfig.assets.player || 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers(this.levelConfig.assets.player || 'dude', {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
        });
        
        this.physics.add.collider(this.player, this.platforms);
        
        this.cursors = this.input.keyboard.createCursorKeys();
        
        const starCount = 12; 
        
        this.stars = this.physics.add.group({
            key: this.levelConfig.assets.star || 'star',
            repeat: starCount - 1, 
            setXY: {x: 12, y: 0, stepX: 70}
        });
        
        this.stars.children.iterate((child) => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });
        this.physics.add.collider(this.stars, this.platforms);
        
        this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, { 
            fontSize: '32px',
            fill: '#ff0000'
        });
        
        /*if (this.bombs) {
            this.bombs.clear(true, true);
    }*/
        
        this.bombs = this.physics.add.group();
        this.physics.add.collider(this.bombs, this.platforms);
        

        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
        
        this.input.keyboard.on('keydown-ESC', this.handleEsc);
        
        this.events.on('shutdown', () => {
            this.input.keyboard.off('keydown-ESC', this.handleEsc);
            if (this.music) {
                this.music.stop(); 
            }
        });
    }
    
    update() {
        
        
        if (this.gameOver) return;
        
        
        const playerSpeed = this.levelConfig ? this.levelConfig.playerSpeed : 160;
        
        if (this.cursors.left.isDown || this.keyA.isDown) {
            this.player.setVelocityX(-playerSpeed);
            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown || this.keyD.isDown) {
            this.player.setVelocityX(playerSpeed);
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn', true);
        }
        
        
        const jumpForce = this.levelConfig ? this.levelConfig.jumpForce : 330;
        
        if ((this.cursors.up.isDown || this.keyW.isDown) && this.player.body.touching.down) {
            this.player.setVelocityY(-jumpForce);
        }        
    }
    


    collectStar(player, star) { 
        star.disableBody(true, true);
        
        this.score += 10;
        this.scoreText.setText(`Score: ${this.score}`);
        
        if (this.stars.countActive(true) === 0) {
        
            this.stars.children.iterate(child => {
                child.enableBody(true, child.x, 0, true, true);
            });
            
            let x = (this.player.x < 400) 
                ? Phaser.Math.Between(400, 800)
                : Phaser.Math.Between(0, 400);
            
        
            const bombSpeed = this.levelConfig ? this.levelConfig.bombSpeed : 200;
            
            let bomb = this.bombs.create(x, 16, this.levelConfig.assets.bomb || 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-bombSpeed, bombSpeed), 20);
            
        }
    }
    

    hitBomb(player, bomb) { 
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        this.gameOver = true; 

        const replayButton = this.add.text(400, 250, 'Перезапуск', {
            fontSize: '32px',
            fill: '#ffffff',
            backgroundColor: '#1e88e5',
            padding: {left: 30, right: 30, top: 10, bottom: 10}
        }).setOrigin(0.5)
        .setInteractive({useHandCursor: true})
        .on('pointerover', () => replayButton.setStyle({fill: '#ff0'}))
        .on('pointerout', () => replayButton.setStyle({fill: '#ffffff'}))
        .on('pointerdown', () => this.scene.start('GameScene'));

        const toMainMenuAfterGameOverButton = this.add.text(400, 350, 'Вернуться в меню', {
            fontSize: '32px',
            fill: '#ffffff',
            backgroundColor: '#1e88e5',
            padding: {left: 30, right: 30, top: 10, bottom: 10}
        }).setOrigin(0.5)
        .setInteractive({useHandCursor: true})
        .on('pointerover', () => toMainMenuAfterGameOverButton.setStyle({fill: '#ff0'}))
        .on('pointerout', () => toMainMenuAfterGameOverButton.setStyle({fill: '#ffffff'}))
        .on('pointerdown', () => this.scene.start('MainMenuScene'));
    }

    createPlatformsForLevel() {
        
        if (this.platforms && this.platforms.children && this.platforms.children.entries) {
            this.platforms.clear(true, true);
        }
        
        
        if (this.levelConfig && this.levelConfig.platforms) {
            
            this.levelConfig.platforms.forEach(platform => {
                this.platforms.create(
                    platform.x, 
                    platform.y, 
                    this.levelConfig.assets.platform || 'ground'
                )
                .setScale(platform.scale || 1)
                .refreshBody();
            });
        } else {
            
            this.platforms.create(400, 568, this.levelConfig.assets.platform || 'ground').setScale(2).refreshBody();
            this.platforms.create(600, 400, this.levelConfig.assets.platform || 'ground');
            this.platforms.create(50, 250, this.levelConfig.assets.platform || 'ground');
            this.platforms.create(750, 220, this.levelConfig.assets.platform || 'ground');
        }
    }
}

export default GameScene;
