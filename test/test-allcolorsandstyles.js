var Watercolor = require('../watercolor.js'),
    watercolor = Watercolor({color : 'red'}),
    i,
    j,
    inspector = require('./inspector.js'),
    colorz = require('./colors.js'),
    test = require('tape'),
    allcolors = Object.keys(colorz.colors),
    allstyles = Object.keys(colorz.styles),
    count = 0,
    testCount = 0,
    styleCount = 0,
    pattern = /^[^T]*T/,
    values = [];

test('print all possible colors and styles', function(t) {
    t.plan(39);
    var inspect = inspector();
    inspect.on('readable', function() {
        var chunk = this.read(),
            data = pattern.exec(chunk.toString());
        if (data === null) {
            return;
        }
        var str = data[0].substr(0, data[0].length - 1);
        values.push(str);
        if (count === allcolors.length) {
            count = 0;
            styleCount += 1;
        }
        t.equal(values[testCount], colorz.colors[allcolors[count]] + colorz.styles[allstyles[styleCount]]);
        process.stdout.write(chunk);
        count += 1;
        testCount += 1;
        
    });

    for (i = 0; i < allstyles.length; i += 1) {
        for (j = 0; j < allcolors.length; j += 1) {
            watercolor.setOpts({color : allcolors[j], style: allstyles[i]});
            watercolor.write("This color should be " + allcolors[j] + " and style should be " + allstyles[i]);
        }
    }
    watercolor.setOpts('normal');
    watercolor.end("All Done!!!!");
    watercolor.pipe(inspect);
});
