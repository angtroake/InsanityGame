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
        for(var j = 0 ; j < this.map_width - 1; j++){
            var t = new Tile(null, "res/test.png", null, null);
            if(j % 2 == 0){
                current_tile.sides[2] = t;
                t.sides[5] = current_tile;
            }else{
                current_tile.sides[1] = t;
                t.sides[4] = current_tile;
            }


            current_tile = t;
        }

        /*
        var new_row = new Tile(null, "res/test.png", null, null);
        row_start.sides[3] = new_row;
        new_row.sides[0] = row_start;
        new_row.sides[1] = row_start.sides[2];
        row_start.sides[2].sides[4] = new_row;

        row_start = new_row;
        */

        var previous_row = this.root_tile;
        var new_row = null;
        var new_start = null;
        var new_last = null;
        for(var i = 0 ; i < this.map_height ; i++){
            new_start = new Tile(null, "res/test.png", null, null);
            new_row = new_start;
            for(var j = 0 ; j < this.map_width ; j++){
                console.log(j);
                new_row.sides[0] = previous_row;
                previous_row.sides[3] = new_row;
                if(j % 2 == 0){
                    if(j > 0){
                        //console.log(previous_row.sides);
                        new_row.sides[5] = previous_row.sides[4]
                        previous_row.sides[4].sides[2] = new_row;

                        new_row.sides[4] = new_last;
                        new_last.sides[1] = new_row;
                    }
                    if(j < this.map_width - 1){
                        new_row.sides[1] = previous_row.sides[2];
                        previous_row.sides[2].sides[4] = new_row;
                    }

                    previous_row = previous_row.sides[2];
                }else{
                    new_row.sides[5] = new_last;
                    new_last.sides[2] = new_row;
                    
                    previous_row = previous_row.sides[1];
                   // console.log(previous_row.sides);
                }
                new_last = new_row;
                new_row = new Tile(null, "res/test.png", null, null);
            }
            previous_row = new_start;

        }
    }
}

module.exports = Map1;