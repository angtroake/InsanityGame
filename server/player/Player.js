var Util = require("../Util.js")

class Player{

    constructor(name, socket){
        Util.generate_uuid();
        this.name = name;
        this.socket = socket;
        this.health = 100;
    }

    send(dest, msg){
        this.socket.emit(dest, msg);
    }

}

module.exports = Player;