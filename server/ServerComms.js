var fs = require("fs")


class ServerComms{
    constructor(server){

        this.io = require('socket.io')(server, {});
        var io = this.io;

        io.sockets.on('connection', function(socket){
            console.log("someone connected!");
        });

        io.sockets.on("disconnect", function(socket){
            console.log("someone disconnected!");
        });
    }
}

module.exports = ServerComms;