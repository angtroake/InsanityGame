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

/**      0
 *   5  ___  1
 *     /   \  
 *   4 \___/ 2
 *       3
 */

class Tile{
    
    constructor(image, uuid){
        this.sides = [null,null,null,null,null,null];
        this.uuid = uuid;
        this.image = image;
        this.last_recursive_uuid = "";
        this.highlight = false;
        this.revealed = false;
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

    render(ctx, render_uuid, x, y){
        if(render_uuid == this.last_recursive_uuid)
            return;
        this.last_recursive_uuid = render_uuid;

        if(this.revealed)
            ctx.drawImage(getImage(this.image), x, y);
        else{
            ctx.drawImage(getImage("/res/cloud.png"), x, y);
        }

        if(this.highlight){
            ctx.lineWidth = 5;
            ctx.fillStyle = "#000";
            ctx.beginPath();
            ctx.moveTo(x, y + TILE_HEIGHT/2);
            ctx.lineTo(x + TILE_WIDTH * 1 / 4, y);
            ctx.lineTo(x + TILE_WIDTH * 3 / 4, y);
            ctx.lineTo(x + TILE_WIDTH, y + TILE_HEIGHT / 2);
            ctx.lineTo(x + TILE_WIDTH * 3 / 4, y + TILE_HEIGHT);
            ctx.lineTo(x + TILE_WIDTH * 1 / 4, y + TILE_HEIGHT);
            ctx.closePath();
            ctx.stroke();
        }

        this.sides.forEach(function(tile, index){
            if(tile){
                tile.render(ctx, render_uuid, x + TILE_SIDE_SHIFT[index].x, y + TILE_SIDE_SHIFT[index].y);
            }else{
                //ctx.drawImage(getIm/resage("/cloud.png"), x + TILE_SIDE_SHIFT[index].x, y + TILE_SIDE_SHIFT[index].y);
            }
        });

    }

    setHighlight(mx, my, x, y, recursive_uuid){
        if(recursive_uuid == this.last_recursive_uuid)
            return;
        this.last_recursive_uuid = recursive_uuid;
        this.highlight = false;
        if(mx > x && mx < x + TILE_WIDTH){
            if(my > y && my < y + TILE_HEIGHT){
                //this.highlight = true;
                var py = my - y;
                var px = mx - x;
                if(px > 1/4 * TILE_WIDTH * Math.abs(-1/TILE_HEIGHT*py + 1) && px < TILE_WIDTH*3/4 + 1/4 * TILE_WIDTH * Math.abs(-1/TILE_HEIGHT*py + 1)){
                    this.highlight = true;
                }
            }
        }
        this.sides.forEach((tile, i) => {
            if(tile)
                tile.setHighlight(mx, my, x + TILE_SIDE_SHIFT[i].x, y + TILE_SIDE_SHIFT[i].y, recursive_uuid);
        });
    }

    getTileFromPosition(px, py, x, y, recursive_uuid){
        if(recursive_uuid == this.last_recursive_uuid)
            return;
        this.last_recursive_uuid = recursive_uuid;
        this.highlight = false;
        if(px > x && px < x + TILE_WIDTH){
            if(py > y && py < y + TILE_HEIGHT){
                return this;
            }
        }
        var tilefound = null;
        this.sides.forEach(function(tile, i){
            if(tile){
                var t = tile.getTileFromPosition(px, py, x + TILE_SIDE_SHIFT[i].x, y + TILE_SIDE_SHIFT[i].y, recursive_uuid);
                if(t)
                    tilefound = t;
            }
        });

        if(tilefound)
            return tilefound;
        return null;
    }

}