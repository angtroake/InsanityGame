
class Tile{

    /**
     * @param {TileType} type 
     */
    constructor(type){
        this.sides = [null, null, null, null, null, null];
        this.type = type;
        this.last_render_uuid = ""; 
    }

    
}

module.exports = Tile;