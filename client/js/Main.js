var socket = io.connect();
var game = null;

function getImage(file){
    var i = new Image;
    i.src = file;
    return i;
}

function showCanvas(){
    $("#menu").hide();
    $("#game").show();
}

function joingame(){
    var playername = $("#playername").val();

    if(playername.length <= 0 || playername.length >= 20){
        console.log("Not Valid Name");
        return;
    }

    socket.emit("join_game", playername);
    game = new Game();
    showCanvas();
}

function generate_uuid(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/*
$(document).ready(function(){
    showCanvas();
});*/