var TileType = require("../TileType")

class Basic extends TileType{
    constructor(name, image){
        super(name, image);
    }
}

module.exports = {
    Basic: Basic
}
