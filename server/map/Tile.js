
class Tile{

    /**
     * @param {TileType} type 
     */
    constructor(uuid, type, image, x, y){
        this.uuid = uuid;
        this.sides = [null, null, null, null, null, null];
        this.type = type;
        this.x = x;
        this.y = y;
        this.image = image;
    }

    
}

module.exports = Tile;