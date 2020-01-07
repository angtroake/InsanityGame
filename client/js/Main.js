var socket = io.connect();
var game = null;

MOVE_AUTH = "";

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

    socket.on("join_game", function(data){
        MOVE_AUTH = data["move_auth"];
        game = new Game(socket, data["game_uuid"], data["player_uuid"]);
    });
    socket.emit("join_game", playername);
    showCanvas();
}

function generate_uuid(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


$(document).ready(function(){
    //showCanvas();

    $("#loginform").on("submit", function(e){
        e.preventDefault();
        joingame();
    });
});


/*
window.onerror = function(message, source, lineno, colno, error) {
    socket.emit("error", {
        "message": message,
        "source": source,
        "lineno": lineno,
        "colno": colno,
        "error": error
    });
    console.log({
        "message": message,
        "source": source,
        "lineno": lineno,
        "colno": colno,
        "error": error
    });
}*/