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
        normal : ''
    },
    styles = {
        underline : '\u001b[4m',
        blink : '\u001b[5m',
    };
colors.success = colors.green;
colors.warn = colors.yellow;
colors.error = colors.red;
styles.normal = colors.normal;

function addNewLine(string) {
    if (/[\n\r]/.test(string)) {
        return false;
    } else {
        return true;;
    }
}

function Watercolor(opts) {
    if (!(this instanceof Watercolor)) {
        return new Watercolor();
    }
    if (opts) {
        this.color = colors[opts.color] || '';
        this.style = styles[opts.style] || '';
    } else {
        this.color = '';
        this.style = '';
    }
    Transform.call(this, { decodeStrings : false });
}

Watercolor.prototype = Object.create(Transform.prototype, {
    constructor : {
        value : Watercolor
    }
});

Watercolor.prototype._transform = function(chunk, encoding, next) { 
    var nl = '';
    if (addNewLine(chunk)) {
        nl = '\n';
    }
    this.push(this.color + this.style + chunk + colors.reset + nl);
    next();
};

Watercolor.prototype.setOpts = function(opts) {
    if (typeof opts === 'string' && opts === 'normal') {
        this.color = colors.normal;
        this.style = styles.normal;
        return;
    }
    if (typeof opts !== 'object') {
        this.emit('error', "must pass options object into setOpts");
        return;
    }
    this.color = colors[opts.color] || this.color;
    if (opts.style === 'normal' || opts.style === '') {
        this.style = '';
        return;
    } else {
        this.style = styles[opts.style] || this.style; 
    }
};

module.exports = function(opts) {
        return new Watercolor(opts);
};



