class Road extends Phaser.GameObjects.Container{
    constructor(config){
        super(config.scene);
        this.scene = config.scene;
        this.back = this.scene.add.image(0, 0, "road");
        this.add(this.back);
        this.scene.add.existing(this);

        Align.center(this.back);

        this.setSize(this.back.displayWidth, game.config.height);
    }
}