var options = {
        color : 'success',
        style : 'normal'
    },
    Watercolor = require('../watercolor.js'),
    watercolor = Watercolor(options),
    fs = require('fs'),
    test = require('tape'),
    inspector = require('./inspector.js'),
    times = 0,
    colorz = require('./colors.js'),
    colorKey = ['yellow', 'gray', 'magenta'],
    styleKey = ['normal', 'normal', 'normal'];


test('verify color values are being written', function(t) {    
    t.plan(3);
    var inspect = inspector(); 

    inspect.on('readable', function() {
        var chunk = this.read(),
            data = chunk.toString().split('\n');
        t.equal(data[0].toString().substr(0, 5), colorz.colors[colorKey[times]] + colorz.styles[styleKey[times]]);
        times += 1;
        process.stdout.write(chunk);
    });

    watercolor.setOpts({color : 'yellow'});
    watercolor.write('hello\n');
    watercolor.setOpts({color : 'gray'});
    watercolor.write('world\n');
    watercolor.setOpts({color : 'magenta'});
    watercolor.write('GOODBYE!!!!\n');

    watercolor.pipe(inspect, { end : false }).pipe(process.stdout);
});
