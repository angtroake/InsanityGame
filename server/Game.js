/** Game
 * 
 *  Feilds:
 *  
 *      - uid - base36 identification string generated based on the time the game was created.
 * 
 * 
 */

class Game{

    constructor(io){
        this._uid = (new Date() - new Date(2019, 08, 16)).toString(36);
    }
}

module.exports = Game;