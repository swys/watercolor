var Transform = require('stream').Transform,
    codes = require('./colors.js');
function Watercolor(opts) {
    if (!(this instanceof Watercolor)) {
        return new Watercolor();
    }
    if (opts) {
        this.color = codes.colors[opts.color] || '';
        this.style = codes.styles[opts.style] || '';
    } else {
        this.color = '';
        this.style = '';
    }
    Transform.call(this, { encoding : 'utf-8' });
}

Watercolor.prototype = Object.create(Transform.prototype, {
    constructor : {
        value : Watercolor
    }
});

Watercolor.prototype._transform = function(chunk, encoding, next) { 
    this.push(this.color + this.style + chunk + codes.reset);
    next();
};

Watercolor.prototype.setOpts = function(opts) {
    if (typeof opts !== 'object' && typeof opts !== 'string') {
        this.emit('error', "must pass options object or string into setOpts method");
        return;
    }
    if (typeof opts !== 'string' && typeof opts !== 'object') {
        this.emit('error', "must pass options object or string into setOpts method");
        return;
    }
    if (typeof opts === 'string' && opts === 'normal') {
        this.color = '';
        this.style = '';;
        return;
    }
    if (opts.color === 'normal') {
        this.color = '';
        if (opts.style === 'normal') {
            this.style = '';
            return;
        }
        this.style = codes.styles[opts.style] || this.style;
        return;
    }
    if (opts.style === 'normal') {
        this.style = '';
        if (opts.color === 'normal') {
            this.style = '';
            return;
        }
        this.color = codes.colors[opts.color] || this.color;
        return;
    }
    this.color = codes.colors[opts.color] || this.color;
    this.style = codes.styles[opts.style] || this.style;    
};

module.exports = function(opts) {
        return new Watercolor(opts);
};



