class Util{

    /**
     * @description Randomizes the order of an Array
     * @param {Array} array Array to be shuffled
     */
    static shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    static generate_uuid(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

module.exports = Util