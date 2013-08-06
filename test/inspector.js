var trans = require('stream').Transform;


function inspector() {
    trans.call(this);
}

inspector.prototype = Object.create(trans.prototype);

inspector.prototype._transform = function(chunk, encoding, next) {
    this.push(chunk);
    next();
};

module.exports = function() {
    return new inspector();
};

