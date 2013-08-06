var Watercolor = require('../watercolor.js'),
    watercolor = Watercolor({color : 'red'}),
    i,
    j,
    inspector = require('./inspector.js'),
    colorz = require('./colors.js'),
    test = require('tape'),
    allcolors = Object.keys(colorz.colors),
    allstyles = Object.keys(colorz.styles),
    testColor = [],
    testStyle = [],
    count = 0,
    testCount = 0;

test('print all possible colors and styles', function(t) {
    t.plan(40);
    var inspect = inspector();
    inspect.on('readable', function() {
        var chunk = this.read(),
            data = chunk.toString().split('\n'),
            codes = data[0].substr(0,9),
            shortCodes = data[0].substr(0,8);
        codes = (codes[codes.length - 1] === 'm' ? codes : shortCodes);
        if (count === 13) {
            if (testStyle.length > 1) {
                testStyle.shift();
            }
            count = 0;
        }
        if (testCount === 39) {
            count = 9;
        }
        t.equal(codes, colorz.styles[testStyle[0]] + colorz.colors[testColor[count]]);
        process.stdout.write(chunk);
        count += 1;
        testCount += 1;
    });
    for (i = 0; i < allstyles.length; i += 1) {
        testStyle.push(allstyles[i]);
        watercolor.setOpts({style : allstyles[i]});
        for (j = 0; j < allcolors.length; j += 1) {
            testColor.push(allcolors[j]);
            watercolor.setOpts({color : allcolors[j]});
            watercolor.write("This color should be " + allcolors[j] + " and style should be " + (allstyles[i] === 'reset' ? 'normal' : allstyles[i]));
        }
    }
    watercolor.setOpts('reset');
    watercolor.end("All Done!!!!");
    watercolor.pipe(inspect).pipe(process.stdout);
});
