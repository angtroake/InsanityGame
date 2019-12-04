var TILE_WIDTH = 128;
var TILE_HEIGHT = 64;

var TILE_SIDE_SHIFT = [
    {"x": 0, "y": -TILE_HEIGHT},
    {"x": TILE_WIDTH*3/4, "y": -TILE_HEIGHT/2},
    {"x": TILE_WIDTH*3/4, "y": TILE_HEIGHT/2},
    {"x": 0, "y": TILE_HEIGHT},
    {"x": -TILE_WIDTH*3/4, "y": TILE_HEIGHT/2},
    {"x": -TILE_WIDTH*3/4, "y": -TILE_HEIGHT/2}
]

class Tile{
    
    constructor(image, uuid, x, y){
        this.sides = [null,null,null,null,null,null];
        this.uuid = uuid;
        this.image = image;
        this.x = x;
        this.y = y;
        this.last_recursive_uuid = "";
        this.highlight = false;
    }

    setSide(side, tile){
        if(side < this.sides.length){
            this.sides[side] = tile;
            tile.sides[(side + 3) % 6] = this;
        }
    }

    getTileFromUUID(uuid, recursive_uuid){
        if(recursive_uuid == this.last_recursive_uuid)
            return;
        
        if(uuid == this.uuid)
            return this;
        
        var tileReturn = null;
        this.sides.forEach(function(tile){
            if(tile)
                var t = tile.getTileFromUUID(uuid, recursive_uuid);
                if(t)
                    tileReturn = t;
        });
        return tileReturn;
    }

    render(ctx, render_uuid, x=this.x, y=this.y){
        if(render_uuid == this.last_recursive_uuid)
            return;
        this.last_recursive_uuid = render_uuid;
        ctx.drawImage(getImage(this.image), x, y);


        if(this.highlight){
            ctx.lineWidth = 10;
            ctx.fillStyle = "#000";
            ctx.beginPath();
            ctx.moveTo(this.x, this.y + TILE_HEIGHT/2);
            ctx.lineTo(this.x + TILE_WIDTH * 1 / 4, this.y);
            ctx.lineTo(this.x + TILE_WIDTH * 3 / 4, this.y);
            ctx.lineTo(this.x + TILE_WIDTH, this.y + TILE_HEIGHT / 2);
            ctx.lineTo(this.x + TILE_WIDTH * 3 / 4, this.y + TILE_HEIGHT);
            ctx.lineTo(this.x + TILE_WIDTH * 1 / 4, this.y + TILE_HEIGHT);
            ctx.closePath();
            ctx.stroke();
        }

        this.sides.forEach(function(tile, index){
            if(tile){
                tile.render(ctx, render_uuid, x + TILE_SIDE_SHIFT[index].x, y + TILE_SIDE_SHIFT[index].y);
            }else{
                ctx.drawImage(getImage("/res/cloud.png"), x + TILE_SIDE_SHIFT[index].x, y + TILE_SIDE_SHIFT[index].y);
            }
        });

    }

    setHighlight(x, y, recursive_uuid){
        if(recursive_uuid == this.last_recursive_uuid)
            return;
        this.last_recursive_uuid = recursive_uuid;
        this.highlight = false;
        if(x > this.x && x < this.x + TILE_WIDTH){
            if(y > this.y && y < this.y + TILE_HEIGHT){
                this.highlight = true;
            }
        }
        this.sides.forEach(function(tile){
            if(tile)
                tile.setHighlight(x, y, recursive_uuid);
        });
    }

    getTileFromPosition(x, y, recursive_uuid){
        if(recursive_uuid == this.last_recursive_uuid)
            return;
        this.last_recursive_uuid = recursive_uuid;
        this.highlight = false;
        if(x > this.x && x < this.x + TILE_WIDTH){
            if(y > this.y && y < this.y + TILE_HEIGHT){
                return this;
            }
        }
        var tilefound = null;
        this.sides.forEach(function(tile){
            if(tile){
                var t = tile.getTileFromPosition(x, y, recursive_uuid);
                if(t)
                    tilefound = t;
            }
        });

        if(tilefound)
            return tilefound;
        return null;
    }

}