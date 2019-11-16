class Map{

    constructor(root_tile){
        this.root_tile = root_tile;
    }
    
    getTile(uuid){
        var recursive_uuid = generate_uuid();
        this.root_tile.getTile(uuid, recursive_uuid);
    }

    addTile(parent_uuid, side, tile){
        var recursive_uuid = generate_uuid();
        var t = this.root_tile.getTile(parent_uuid, recursive_uuid);
        if(!t.sides[side]){
            t.setSide(side, tile);
            return true;
        }
        return false;
    }

    render(ctx, render_uuid){
        this.root_tile.render(ctx, render_uuid, 200, 200);
    }

    tick(){

    }

}