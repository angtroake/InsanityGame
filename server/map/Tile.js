var Util = require("../Util.js")

/**      1
 *   0  ___  2
 *     /   \  
 *   5 \___/ 3
 *       4
 */
class Tile{

    /**
     * @param {TileType} type 
     */
    constructor(type, image, x, y){
        this.uuid = Util.generate_uuid();
        this.sides = [null, null, null, null, null, null];
        this.type = type;
        this.x = x;
        this.y = y;
        this.image = image;
        this.last_recursion = null;
    }

    addToList(list, recursion_uuid){
        if(this.last_recursion != recursion_uuid){

            var sides_uuid = [];
            this.sides.forEach((side) => {
                if(side)
                    sides_uuid.push(side.uuid);
                else
                    sides_uuid.push(null);
            });

            list.push({
                "uuid": this.uuid,
                "type": this.type,
                "x": this.x,
                "y": this.y,
                "image": this.image,
                "sides": sides_uuid
            });
            this.last_recursion = recursion_uuid;

            this.sides.forEach((side)=>{
                if(side)
                side.addToList(list, recursion_uuid);
            });
        }
    }

    
}

module.exports = Tile;