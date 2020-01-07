var Map = require("../Map.js")
var Tile = require("../Tile.js")

// Rename from Map1 to MapNAME when Name figured out
class Map1 extends Map{

    constructor(){
        super();
    }

    get images(){
        return [
            "/res/test.png"
        ]
    }

    get map_height(){
        return 100;
    }

    get map_width(){
        return 10;
    }

    addTile(current_tile){

    }

    generate(){
        var current_tile = this.root_tile;
        for(var j = 0 ; j < this.map_width; j++){
            var t = new Tile(null, "res/test.png", 400, 400);
            current_tile.sides[2] = t;
            t.sides[5] = current_tile;
            current_tile = t;
        }

    }
}

module.exports = Map1;