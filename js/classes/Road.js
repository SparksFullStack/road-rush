class Road extends Phaser.GameObjects.Container {
    constructor(config){
        super(config.scene);
        this.scene = config.scene;
        this.back = this.scene.add.image(0, 0, "road");
        this.add(this.back);
        this.scene.add.existing(this);

        Align.scaleToGameWidth(this.back, .5);        

        this.setSize(this.back.displayWidth, game.config.height);

        this.lineGroup = this.scene.add.group();
        this.count = 0; // this is the count for the number of lines that have passed by.

        this.car = this.scene.add.sprite(this.displayWidth / 4, game.config.height * .9, "cars");
        Align.scaleToGameWidth(this.car, .1);
        this.add(this.car);

        this.car.setInteractive();
        this.car.on('pointerdown', this.changeLanes, this);
    }

    makeLines(){
        this.vSpace = this.displayHeight / 10;
        for (var i = 0; i < 20; i++){
            var line = this.scene.add.image(this.x, this.vSpace * i, "line");
            line.originalY = line.y;
            this.lineGroup.add(line);
        }
    }

    moveLines(){
        this.lineGroup.children.iterate((child) => child.y += this.vSpace / 20);
        this.count++;

        if (this.count === 20){
            this.count = 0;
            this.lineGroup.children.iterate((child) => child.y = child.originalY);
        }
    }

    changeLanes(){
        if (this.car.x > 0) this.car.x = -this.displayWidth / 4;
        else this.car.x = this.displayWidth / 4;
    }
}