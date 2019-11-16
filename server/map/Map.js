var Util = require("../Util.js")

class Map{

    constructor(){
        this.tiledeck = [];
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