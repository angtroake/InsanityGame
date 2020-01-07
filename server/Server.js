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
            console.log("reet " + game.players.length + " " + game.state);
            if(!joinedGame && (game.state = Game.GAME_STATE.lobby && game.players.length < Game.MAX_PLAYERS)){
                game.playerJoin(player);
                socket.join(game.socket_room);
                joinedGame = true;
            }
        });
        if(!joinedGame){
            var newgame = new Game(this.io);
            this.games.push(newgame);
            socket.join(newgame.socket_room);
            newgame.playerJoin(player);

        }
    }
}

module.exports = Server;
