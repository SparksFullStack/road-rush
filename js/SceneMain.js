class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {
        // preload all assets
        this.load.image("barrier", "images/barrier.png");
        this.load.spritesheet("cars", "images/cars.png", {frameWidth: 60, frameHeight: 126});
        this.load.image("cone", "images/cone.png");
        this.load.image("line", "images/line.png");
        this.load.image("pcar1", "images/pcar1.png");
        this.load.image("pcar2", "images/pcar2.png");
        this.load.image("road", "images/road.jpg");
        this.load.image("title", "images/title.png");
        this.load.image("titleBlack", "images/titleBlack.png");
    }
    create() {
        // defines all objects for the scene        
        this.road = new Road({ scene: this });
        this.road.x = game.config.width / 2;
    }
    update() {
        // constantly runnning loop
    }

    // *NOTE: you can add custom functions, as well
}

const newScene = new SceneMain();