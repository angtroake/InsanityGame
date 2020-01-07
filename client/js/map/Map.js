class Map{

    constructor(root_tile){
        this.root_tile = root_tile;
        this.root_x = 400;
        this.root_y = 400;
    }
    
    getTileFromUUID(uuid){
        var recursive_uuid = generate_uuid();
        return this.root_tile.getTileFromUUID(uuid, recursive_uuid);
    }

    addTile(parent_uuid, side, tile){
        var recursive_uuid = generate_uuid();
        var t = this.root_tile.getTileFromUUID(parent_uuid, recursive_uuid);
        if(!t.sides[side]){
            t.setSide(side, tile);
            return true;
        }
        return false;
    }

    render(ctx, render_uuid){
        this.root_tile.render(ctx, render_uuid, this.root_x, this.root_y);
    }

    tick(){

    }

}