var Transform = require('stream').Transform,
    colors = {
        black : '\u001b[30m',
        gray : '\u001b[90m',
        red : '\u001b[91m',
        green : '\u001b[92m',
        yellow : '\u001b[93m',
        blue : '\u001b[94m',
        magenta : '\u001b[95m',
        cyan : '\u001b[96m',
        white : '\u001b[37m',
        reset : '\u001b[0m',
        error : '\u001b[91m',
        warn : '\u001b[93m',
        success : '\u001b[92m'
    },
    styles = {
        underline : '\u001b[4m',
        blink : '\u001b[5m',
        reset : '\u001b[0m'
    };

function addNewLine(string) {
    if (/[\n\r]/.test(string)) {
        return string;
    } else {
        return string + '\n';
    }
}

function Watercolor(opts) {
    if (!(this instanceof Watercolor)) {
        return new Watercolor();
    }
    if (opts) {
        this.color = colors[opts.color] || '';
        this.style = styles[opts.style] || '';
    }
    Transform.call(this, { decodeStrings : false });
}

Watercolor.prototype = Object.create(Transform.prototype, {
    constructor : {
        value : Watercolor
    }
});

Watercolor.prototype._transform = function(chunk, encoding, next) { 
    this.push(this.style + this.color + addNewLine(chunk) + colors.reset);
    next();
};

Watercolor.prototype.setOpts = function(opts) {
    if (typeof opts === 'string' && opts === 'reset') {
        this.color = colors.reset;
        this.style = colors.reset;
        return;
    }
    if (typeof opts !== 'object') {
        this.emit('error', "must pass options object into setOpts");
    }
    this.color = colors[opts.color] || this.color;
    this.style = styles[opts.style] || this.style;
};

module.exports = function(opts) {
        return new Watercolor(opts);
};



