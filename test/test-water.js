var options = {
        color : 'success',
        //style : 'blink'
    },
    Watercolor = require('../watercolor.js'),
    watercolor = Watercolor(options),
    fs = require('fs'),
    test = require('tape'),
    trans = require('stream').Transform,
    inspector = require('./inspector.js'),
    times = 0,
    firstTen = ['\u001b[93m', '\u001b[90m', '\u001b[4m\u001b'];


test('verify color values are being written', function(t) {    
    t.plan(3);
    var inspect = inspector(); 

    inspect.on('readable', function() {
        var chunk = this.read(),
            data = chunk.toString().split('\n');
        t.equal(data[0].toString().substr(0, 5), firstTen[times]);
        times += 1;
        process.stdout.write(chunk);
    });

    watercolor.setOpts({color : 'yellow'});
    watercolor.write('hello\n');
    watercolor.setOpts({color : 'gray'});
    watercolor.write('world\n');
    watercolor.setOpts({color : 'magenta', style : 'underline'});
    watercolor.end('GOODBYE!!!!\n');

    watercolor.pipe(inspect, { end : false }).pipe(process.stdout);
});
