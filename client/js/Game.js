var TARGET_FPS = 60;

//CLIENT
class Game{

    constructor(socket, uuid, player){
        this.uuid = uuid;
        this.socket = socket;
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas  = $(this.canvas);
        this.game_state = "lobby";

        this.mouse_listener = new MouseListener(this);

        this.map = new Map(new Tile("/res/test.png", generate_uuid()));
        this.map = null;
        this.player = player;
        this.turn_time = 0;
        this.players = [];
        this.max_players;
        
        this.socket.on("lobby_tick", (response) => {this.lobbyTick(response)});
        this.socket.on("game_tick", (response) => {this.gameTick(response)});
        this.socket.on("game_start", (response) => {this.gameStart(response)});

        setInterval(() => {
            this.canvas.attr("width", $(window).innerWidth());
            this.canvas.attr("height", $(window).outerHeight());
            this.render();
        }, 1000 / TARGET_FPS);
    }


    gameStart(response){
        //console.log(response.root_tile.uuid);
        this.map = new Map(new Tile(response.root_tile.image, response.root_tile.uuid, response.root_tile.x, response.root_tile.y));
        this.game_state = "ingame";
    }

    gameTick(response){
        this.game_state = "ingame";
        this.current_player = response.current_player;
        this.time = response.time;
        this.players = response.players;


        this.players_on_tiles = {};

        this.players.forEach((p) => {
            
            if(!this.players_on_tiles[p.tile_uuid]){
                //console.log("meep");
                this.players_on_tiles[p.tile_uuid] = [];
            }
            this.players_on_tiles[p.tile_uuid].push(p);
        });
        //console.log(this.players_on_tiles);
    }

    lobbyTick(response){
        this.game_state = "lobby";
        this.turn_time = response.time;
        this.players = response.players;
        this.max_players = response.max_players;

    }

    render(){
        var WIDTH = this.canvas.attr("width");
        var HEIGHT = this.canvas.attr("height");

        if(this.game_state == "lobby"){
            this.ctx.font = "30px Arial";
            this.ctx.fillText("Lobby", 10, 50);
            this.ctx.fillText("Time: " + this.turn_time, 10, 80);
            this.ctx.fillText("Players (" + this.players.length + "/" + this.max_players + ")", 10, 140);
            this.ctx.font = "20px Arial";
            this.players.forEach((name, i) => {
                this.ctx.fillText(name, 15, 170 + i*20)
            });
        }
        else if(this.game_state == "ingame"){
            var render_uuid = generate_uuid();
            this.ctx.rect(0, 0, this.canvas.width(), this.canvas.height());
            this.ctx.fillStyle = "rgb(39, 170, 227)"
            this.ctx.fill();
            
            this.map.render(this.ctx, render_uuid);
            
            this.ctx.fillStyle = "#000";
            this.ctx.font = "30px Arial";
            this.ctx.textAlign = "center";
            this.ctx.fillText("Current Turn", this.canvas.width() / 2, 40);
            this.ctx.font = "20px Arial";
            this.ctx.fillText(this.current_player, this.canvas.width() / 2, 60);
            this.ctx.font = "45px Arial";
            this.ctx.fillText(this.time, this.canvas.width() / 2, 100);
            

            $.each(this.players_on_tiles, (tile_uuid, player_list) => {
                var tile = this.map.getTileFromUUID(tile_uuid);
                player_list.forEach((player) => {
                    this.ctx.fillRect(tile.x + TILE_WIDTH/2 - 5, tile.y + TILE_HEIGHT/2 - 5, 10, 10);
                });
            });

            //PLAYER INFORMATION OVERLAY
            this.ctx.beginPath();
            this.ctx.fillStyle = "rgb(80, 80, 80)"
            this.ctx.arc(150, HEIGHT - 150, 115, 0, 2 * Math.PI);
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.strokeStyle = "#7d4f0f";
            this.ctx.lineWidth = 30;
            this.ctx.arc(150, HEIGHT - 150, 130, 0, 2 * Math.PI);
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.strokeStyle = "#cf0000";
            this.ctx.lineWidth = 15;
            this.ctx.arc(150, HEIGHT - 150, 130, Math.PI/3, -Math.PI/3, true);
            this.ctx.stroke();
        }
    }
}