class MouseListener{

    constructor(game){
        this.game = game;
        var self = this;
        $("#canvas").mousemove(function(e){self.onMouseMove(e);});
    }

    onMouseMove(event){
        if(this.game.map){
            var recursive_uuid = generate_uuid();
            this.game.map.root_tile.setHighlight(event.offsetX, event.offsetY, this.game.map.root_x, this.game.map.root_y, recursive_uuid);
        }
    }

}
