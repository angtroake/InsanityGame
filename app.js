var express = require('express');
var app = express();
var server = require('http').Server(app);

app.get('/', function(req, res){
    res.sendFile(__dirname + "/client/index.html");
});

app.use('/res', express.static(__dirname + '/client/res'));
app.use('/css', express.static(__dirname + '/client/css'));
app.use('/js', express.static(__dirname + '/client/js'));


server.listen(8000);
console.log("Server running at 127.0.0.1:8000");

var players = [];
var sockets = [];

var serverComms = new (require("./server/ServerComms.js"))(server);

