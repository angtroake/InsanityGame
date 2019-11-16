var Map = require("../Map.js")

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
}

module.exports = Map1;