var Watercolor = require('../watercolor.js');
    watercolor = Watercolor({color : 'red'}),
    fs = require('fs'),
    path = require('path'),
    test = require('tape'),
    start = 0,
    end = 499,
    colorKeys = ['red', 'white', 'blue'],
    colorIdx = 0,
    src = null,
    colorz = require('./colors.js');

test('stream file to red white and blue', function(t) {
    t.plan(3);
    for (var i = 0; i < colorKeys.length; i += 1) {
        src = fs.createReadStream(__dirname + path.sep + 'run.js', { encoding : 'utf-8', start : start, end : end });
        start += 500;
        end += 500;
        src.pipe(watercolor, { end : false });
    }
    watercolor.on('readable', function() {
        var chunk = watercolor.read();
            data = chunk.toString().split('\n')[0].toString().substr(0,5);
        t.equal(data, colorz.colors[colorKeys[colorIdx]]);
        colorIdx += 1;
        var nextColor = colorKeys[colorIdx];
        watercolor.setOpts({color : nextColor});
        process.stdout.write(chunk.toString());
    });
});

        
