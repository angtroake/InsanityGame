//var fs = require("fs")
var util = require("./Util.js");
var Player = require("./player/Player.js");
var Game = require("./Game.js")

class Server{
    constructor(server){
        this.games = [];
        var self = this;
        this.io = require('socket.io')(server, {});

        this.io.sockets.on('connection', (socket) => {
            console.log("someone connected!");
            

            socket.on('disconnect', (socket) => {
                console.log("someone disconnected!");
            });

            socket.on("join_game", (playername) => {this.onPlayerJoinGame(playername, socket)});
        });
    }

    onPlayerJoinGame(playername, socket){
        var player = new Player(playername, socket);
        var joinedGame = false;
        this.games.forEach(function(game){
            if(!joinedGame && (game.state = Game.GAME_STATE.ingame && game.players.length < Game.MAX_PLAYERS)){
                game.playerJoin(player);
                joinedGame = true;
            }
        });
        if(!joinedGame){
            var newgame = new Game(this.io);
            this.games.push(newgame);
            newgame.playerJoin(player);

        }
    }
}

module.exports = Server;
