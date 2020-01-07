var Util = require("../Util.js");
var Tile = require("./Tile.js");

class Map{

    constructor(){
        this.tiledeck = [];
        this.root_tile = new Tile(null, "res/test.png", 400, 400);
        this.generate();
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

    tiles_to_list(){
        var list = [];
        this.root_tile.addToList(list, Util.generate_uuid());
        return list;
    }

    generate(){}
}

module.exports = Map;