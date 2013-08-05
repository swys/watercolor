var options = {
        color : 'success',
        //style : 'blink'
    },
    Watercolor = require('./watercolor.js'),
    watercolor = Watercolor(options),
    fs = require('fs');

var src = fs.createReadStream(__dirname + '/watercolor.js');

src.pipe(watercolor, { end : false }).pipe(process.stdout);
watercolor.on('end', function() {
    process.stdout.write("Watercolor __ENDED__\n");
});

src.on('close', function() {
    watercolor.setOpts({color : 'yellow'});
    watercolor.write('hello\n');
    watercolor.setOpts({color : 'gray'});
    watercolor.write('world\n');
    watercolor.setOpts({color : 'magenta', style : 'underline'});
    watercolor.end('GOODBYE!!!!\n');
});
//watercolor.pipe(process.stdout);
