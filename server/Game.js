var Util = require("./Util.js")
var Map = require("./map/map1/Map.js");


const MAX_TURN_TIME = 60; //Seconds
const MAX_LOBBY_TIME = 10;
const MAX_PLAYERS = 6;

class Game{

    constructor(io){
        this.uuid = Util.generate_uuid();
        this.io = io;
        this.players = [];
        this.time = 0;
        this.round = 0;

        this.currentPlayer = null;

        this.map = new Map();
        
        this.running = true;
        this.state = Game.GAME_STATE.lobby;
        console.log(Game.GAME_STATE);

        this.socket_room = "game/" + this.uuid;


        setTimeout(() => {this.tick()}, 0);
    }

    playerJoin(player){
        console.log("Player Join");
        this.players.push(player);
        player.send("join_game", this.uuid);
        
    }

    playerQuit(){
        console.log("Player Join");
    }

    tick(){
        if(this.state == Game.GAME_STATE.lobby){
            this.emit("lobby_tick", {
                "time": MAX_LOBBY_TIME - this.time,
                "players": this._listPlayers(),
                "max_players": MAX_PLAYERS
            });
            
            if(this.players.count == MAX_PLAYERS && this.time < MAX_LOBBY_TIME - 10)
                this.time = MAX_LOBBY_TIME - 10;

            if(this.time >= MAX_LOBBY_TIME)
                if(this.players.length < 1)
                    this.time = 0;
                else
                    this.startGame();
            else
                this.time++;
        }else if(this.state == Game.GAME_STATE.ingame){
            this.emit("game_tick", {
                "current_player": this.currentPlayer.name,
                "time": MAX_TURN_TIME - this.time
            });
            console.log(this.time);
            if(this.time >= MAX_TURN_TIME)
                this.nextTurn();
            else
                this.time++;
        }




        

        if(this.running)
            setTimeout(() => {this.tick()}, 1000);
    }

    startGame(){
        this.time = 0;
        this.state = Game.GAME_STATE.ingame;
        Util.shuffle(this.players);
        this.currentPlayer = this.players.shift();
        this.players.push(this.currentPlayer);
        this.emit("game_start", {});
    }

    nextTurn(){
        this.currentPlayer = this.players.shift();
        this.players.push(this.currentPlayer);
        this.time = 0;
    }

    emit(dest, msg){
        this.io.sockets.in(this.socket_room).emit(dest, msg);
    }


    _listPlayers(){
        var name_list = [];
        this.players.forEach(function(p){name_list.push(p.name)});
        return name_list;
    }
}

Game.GAME_STATE = {"ingame": 0, "lobby": 1};
Game.MAX_PLAYERS = 6;

module.exports = Game;