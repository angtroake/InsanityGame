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
    
    constructor(image, uuid){
        this.sides = [null,null,null,null,null,null];
        this.uuid = uuid;
        this.image = image;
        this.last_recursive_uuid = "";
    }
    /*
    render(ctx, scrollX=0, scrollY=0){
        ctx.drawImage(getImage(this.image), this.x, this.y);
    }*/

    setSide(side, tile){
        if(side < this.sides.length){
            this.sides[side] = tile;
            tile.sides[(side + 3) % 6] = this;
        }
    }

    getTile(uuid, recursive_uuid){
        if(recursive_uuid == this.last_recursive_uuid)
            return;
        
        if(uuid == this.uuid)
            return this;
        
        var tileReturn = null;
        this.sides.forEach(function(tile){
            if(tile)
                var t = tile.getTile(uuid, recursive_uuid);
                if(t)
                    tileReturn = t;
        });
        return tileReturn;
    }

    render(ctx, render_uuid, x, y){
        if(render_uuid == this.last_recursive_uuid)
            return;
        this.last_recursive_uuid = render_uuid;
        ctx.drawImage(getImage(this.image), x, y);
        this.sides.forEach(function(tile, index){
            if(tile){
                tile.render(ctx, render_uuid, x + TILE_SIDE_SHIFT[index].x, y + TILE_SIDE_SHIFT[index].y);
            }else{
                ctx.drawImage(getImage("/res/cloud.png"), x + TILE_SIDE_SHIFT[index].x, y + TILE_SIDE_SHIFT[index].y);
            }
        });

    }

}