var canvas = null;
var ctx = null;

var TARGET_FPS = 60;

var map = null;
//TEstung stuff
$(document).ready(function(){
    
    map = new Map(new Tile("/res/test.png", generate_uuid()));
    var tileTest = new Tile("/res/test.png", generate_uuid());
    map.root_tile.setSide(0, tileTest);
    var f = map.addTile(tileTest.uuid, 1, new Tile("/res/test.png", generate_uuid()));
    console.log(f);
});
//End testing


function showCanvas(){
    $("#menu").hide();
    $("#game").show();

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    canvas = $(canvas);

    setInterval(() => {
        tick();
        render(ctx);
    }, 1000 / TARGET_FPS);
}

function tick(){
    canvas.attr("width", $(window).innerWidth());
    canvas.attr("height", $(window).outerHeight());
}

function render(ctx){
    var render_uuid = generate_uuid();
    ctx.rect(0, 0, canvas.width(), canvas.height());
    ctx.fillStyle = "rgb(39, 170, 227)"
    ctx.fill();
    
    map.render(ctx, render_uuid);
}