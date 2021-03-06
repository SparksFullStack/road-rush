class Road extends Phaser.GameObjects.Container {
    constructor(config){
        /* CONFIGURING THE ROAD */
        super(config.scene);
        this.scene = config.scene;
        this.back = this.scene.add.image(0, 0, "road");
        this.add(this.back);
        this.scene.add.existing(this);

        Align.scaleToGameWidth(this.back, .5);        

        this.setSize(this.back.displayWidth, game.config.height);
        /* ** */

        /* ADDING THE LINES */
        this.lineGroup = this.scene.add.group();
        this.count = 0; // this is the count for the number of lines that have passed by.
        /* ** */

        /* ADDING THE CAR */
        this.car = this.scene.add.sprite(this.displayWidth / 4, game.config.height * .9, "cars");
        Align.scaleToGameWidth(this.car, .1);
        this.add(this.car);
        // setting the car as interactive
        this.back.setInteractive();
        this.back.on('pointerdown', this.changeLanes, this);
        /* ** */

        /* ADDING THE OBSTACLES */
        this.addObject();
        /* ** */
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

    addObject(){
        /* Randoming spawning one of the obstacles */
        const spriteKeys = [{key: 'pcar1', speed: 10, scale: 10}, {key: 'pcar2', speed: 10, scale: 10}, {key: 'cone', speed: 20, scale: 5}, {key: 'barrier', speed: 20, scale: 8}];
        let index = Math.floor(Math.random() * 4);
        this.object = this.scene.add.sprite(-this.displayWidth / 4, 0, spriteKeys[index].key);
        this.object.speed = spriteKeys[index].speed;
        let scale = spriteKeys[index].scale / 100;
        /* ** */

        /* Making the spawn lane random */
        let lane = Math.random() * 100;
        if (lane < 50) this.object.x = this.displayWidth / 4;
        else this.object.x = -this.displayWidth / 4;
        /* ** */

        Align.scaleToGameWidth(this.object, scale);
        this.add(this.object);
    }

    moveObject(){
        this.object.y += this.vSpace / this.object.speed;

        /* Adding in collision checking */
        if (Collision.checkColide(this.car, this.object) === true) this.car.alpha = .5;
        else this.car.alpha = 1;
        /* ** */
        
        if (this.object.y > game.config.height){
            this.object.destroy();
            this.addObject();
        }
    }
}
