var TARGET_FPS = 60;

//CLIENT
class Game{

    constructor(){
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas  = $(this.canvas);

        this.map = new Map(new Tile("/res/test.png", generate_uuid()));

        var tileTest = new Tile("/res/test.png", generate_uuid());
        this.map.root_tile.setSide(0, tileTest);
        var f = this.map.addTile(tileTest.uuid, 1, new Tile("/res/test.png", generate_uuid()));
    
        setInterval(() => {
            this.tick();
            this.render();
        }, 1000 / TARGET_FPS);
    }

    tick(){
        this.canvas.attr("width", $(window).innerWidth());
        this.canvas.attr("height", $(window).outerHeight());
    }

    render(){
        var render_uuid = generate_uuid();
        this.ctx.rect(0, 0, this.canvas.width(), this.canvas.height());
        this.ctx.fillStyle = "rgb(39, 170, 227)"
        this.ctx.fill();
        
        this.map.render(this.ctx, render_uuid);
    }
}