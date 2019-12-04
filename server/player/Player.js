var Util = require("../Util.js")

class Player{

    constructor(name, socket){
        this.uuid = Util.generate_uuid();
        this.name = name;
        this.socket = socket;
        this.health = 10;
        this.agility = 3; //how far you can move
        this.sanity = 10;
        this.strength = 2;
        this.tile_uuid = null;
        this.game = null; //set by Game.js


        socket.on("move", (data) => {this.moveRequest(data)})
    }

    send(dest, msg){
        this.socket.emit(dest, msg);
    }


    moveRequest(data){
        
    }


}

module.exports = Player;