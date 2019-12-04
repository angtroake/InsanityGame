var Util = require("../Util.js");
var Tile = require("./Tile.js");

class Map{

    constructor(){
        this.tiledeck = [];
        this.root_tile = new Tile(Util.generate_uuid(), null, "res/test.png", 400, 400);
    }

    get images(){
        return [];
    }

    start(){
        Util.shuffle(this.tiledeck)
    }

    getImages(io){
        io.emit("images", this.images);
    }
}

module.exports = Map;