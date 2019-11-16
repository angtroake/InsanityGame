var Util = require("./Util.js")
var Map = require("./map/map1/Map.js");


var MAX_TURN_TIME = 60; //Seconds

class Game{

    static GAME_STATE(){return {"ingame": 0, "lobby": 1}};
    static MAX_PLAYERS(){return 6};

    constructor(io){
        this.id = Util.generate_uuid();
        this.io = io;
        this.players = [];
        this.time = 0;
        this.round = 0;

        this.currentPlayer = null;

        this.map = new Map();
        
        this.running = true;
        this.state = Game.GAME_STATE.lobby;
    }

    playerJoin(player){
        console.log("Player Join");
        this.players.push(player);
        //player.send("images", this.map.images);
        
    }

    playerQuit(){
        console.log("Player Join");
    }

    start(){
        Util.shuffle(this.players);
    }

    tick(){
        if(this.state == Game.GAME_STATE.lobby){



        }else if(this.state == Game.GAME_STATE.ingame){


            if(this.time >= MAX_TURN_TIME)
                this.nextTurn();
            else
                this.time++;
        }




        

        if(this.running)
            setTimeout(this.tick, 1000);
    }

    nextTurn(){
        this.currentPlayer = this.players.shift();
        this.players.push(this.currentPlayer);
    }
}

module.exports = Game;