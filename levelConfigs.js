const levelConfigs = {
    1: {
        stars: 60,
        bombSpeed: 160,
        playerSpeed: 170,
        jumpForce: 340,
        backgroundColor: 0x87CEEB,
        assets: {
            background: 'sky',
            platform: 'ground',
            player: 'dude',
            star: 'star',
            bomb: 'bomb',
            music: 'backgroundMusic'
        },
        platforms: [
            { x: 400, y: 568, scale: 2 },
            { x: 600, y: 400, scale: 1 },
            { x: 50, y: 250, scale: 1 },
            { x: 750, y: 220, scale: 1 }
        ]
    },
    
    2: {
        stars: 70,
        bombSpeed: 180,
        playerSpeed: 180,
        jumpForce: 350,
        backgroundColor: 0xffffff,
        assets: {
            background: 'sky2',
            platform: 'ground2',
            player: 'dude',
            star: 'star',
            bomb: 'bomb',
            music: 'backgroundMusic'
        },
        platforms: [
            { x : 400, y : 568, scale : 2 },   
            { x : 650, y : 338, scale : 0.6 },
            
        ]
    },
    
    3: {
        stars: 80,
        bombSpeed: 200,
        playerSpeed: 190,
        jumpForce: 360,

        backgroundColor: 0xffffff,
        assets: {
            background: 'sky3',
            platform: 'ground3',
            player: 'dude',
            star: 'star',
            bomb: 'bomb',
            music: 'backgroundMusic'
        },
        platforms: [
            { x: 400, y: 568, scale: 2 },
            { x: 600, y: 400, scale: 1 },
            { x: 750, y: 220, scale: 1 },
            { x: 400, y: 320, scale: 1 },
            { x: 200, y: 180, scale: 1 }
        ]
    },
    
    4: {
        stars: 90,
        bombSpeed: 220,
        playerSpeed: 200,
        jumpForce: 370,
        backgroundColor: 0xffffff,
        assets: {
            background: 'sky4',
            platform: 'ground4',
            player: 'dude',
            star: 'star',
            bomb: 'bomb',
            music: 'backgroundMusic'
        },
        platforms: [
            { x: 400, y: 568, scale: 2 },
            { x: 600, y: 400, scale: 1 },
            { x: 50, y: 250, scale: 1 },
            
        ]
    },
    
    5: {
        stars: 100,
        bombSpeed: 240,
        playerSpeed: 210,
        jumpForce: 380,
        backgroundColor: 0x000000,
        assets: {
            background: 'sky5',
            platform: 'ground5',
            player: 'dude',
            star: 'star',
            bomb: 'bomb',
            music: 'backgroundMusic'
        },
        platforms: [
            { x: 400, y: 568, scale: 2 },
            { x: 600, y: 400, scale: 1 },
            { x: 50, y: 250, scale: 1 },
            
        ]
    }
};

export default levelConfigs;
