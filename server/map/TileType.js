class TileType{

    constructor(name, image){
        this.name = name;
        this.image = image;
    }
    
    /**
     * 
     * @description Called when the tile is created
     * 
     * @param {Player} player Player who caused tile creation
     * 
     */
    on_create(player){}

    /** on_player_walk()
     * 
     * @description Called when a player walks over the tile
     * 
     *  @param {Player} player Player who walked over the tile
     * 
     */
    on_player_walk(player){}

}


module.exports = TileType;