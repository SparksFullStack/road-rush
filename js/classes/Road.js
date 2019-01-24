class Road extends Phaser.GameObjects.Container{
    constructor(config){
        super(config.scene);
        this.scene = config.scene;
        this.road = this.scene.add.image(0, 0, "road");
        this.add(this.road);
        this.scene.add.existing(this);
    }
}