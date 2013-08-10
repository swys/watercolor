watercolor
==========

A very simple transform stream that outputs text streams to the console with color and style. You can either pipe in a readable stream or write to it directly.

watercolor uses Node's `Streams 2` API to do its dirty work!

install
=======

`npm install watercolor`


example
=======

####Write directly to it :
#

```
var Watercolor = require('watercolor'),
    watercolor = Watercolor({
        style : 'normal',
        color : 'red'
    });

watercolor.write("Hello\n");
watercolor.end("World\n");
watercolor.pipe(process.stdout);
```

The call to `watercolor.write` will output __**Hello**__ in red text with no styling to the console and insert a line break.

The call to `watercolor.end` will output __**World**__ in red text with no styling to the console, insert a line break, and finally end the stream. goodbye!
#
####Pipe a readable stream to it :
#
```
var Watercolor = require('watercolor'),
    watercolor({
        style : 'underline',
        color : 'yellow'
    }),
    fs = require('fs'),
    readableStream = fs.createReadStream('./path/to/file');

readableStream.pipe(watercolor).pipe(process.stdout);
```
#
The above code will send all of the contents of `readableStream` into `watercolor` and `watercolor` will output the text to `process.stdout` underlined with yellow text.


usage
=======
I've mainly been using this in my test runner to output a colored Summery report so I can easily see if tests pass/fail by color.
You can hook this into `child_process` `stdout` and `stderr` to get realtime color queues if there are errors occurring with the other node processess you are running.

####Color seperate `child_process.stdout` and `child_process.stderr`
```
var Watercolor = require('watercolor'),
    errTxt = watercolor({
        color : 'error'
    }),
    successTxt = watercolor({
        color : 'success'
    }),
    spawn = require('child_process').spawn(),
    child = spawn('node', ['myChild.js']);\
    

child.process.stderr.write("Something went wrong! I will print in RED\n");
child.process.stdout.write("I\'m just doing what I should be doing, and in GREEN\n");

child.stdout.pipe(successTxt).pipe(process.stdout);
child.stderr.pipe(errTxt).pipe(process.stdout);

child.on('exit', function(exitcode) {
    (exitcode ? errTxt : successTxt).write("Ended with exitcode : " + exitcode);
});
```

The above code will format the child's `stdout` to print `green` text out to the console.

Child's `stderr` will be formatted as `red` text out to the console. 

The `exitcode` statement will print either `green` or `red` depending on the outcome.

`success` is mapped to the color green.


`error` is mapped to `red`.


`warn` is mapped to `yellow`.

Another possible use case would be to color seperate I/O from different sources. Like if you have multipe Databases you can color seperate the log output to make it easier to see what is going on with your application.


options
=======

##.setOpts() method
#
This method takes either a `string` or an `object` as its argument.

####pass a string
#
Currently this option is reserved for `normal` which will set the `color` and `style` to normal --> meaning it will reset all options and print non-formatted text to the console.

#####example
#

`watercolor.setOpts('normal');`
#
This will change both the style and color properties to `normal` unformatted text.

####pass an object
#
You can also pass an object to change 1 or both of the properties. `color` or `style`.

####example
#
#####This sets the output to have `green` text with no style
```
watercolor.setOpts({
    color : 'green',
    style : 'normal'
});
```

####or just set 1 value and the other one with stay the same
#
#####This keeps the `green` color but changes the style to `underline`
```
watercolor.setOpts({
    style : 'underline'
});
```

##available colors
#
`black` `white` `red` `green` `gray`

`yellow` `blue` `cyan` `magenta`

`normal` `success` `warn` `error`

##available styles
#
`underline` `blink` `normal`

__**Note :**__
I realize that there are a few other options such as `bold` or `italic` but when I tested them on my computer (Mac OSX Lion) they did not work. I didn't want to put anything in here that I could not test myself. If you know of any colors or styles that do work and should be included please feel free to file an issue.

tests
=======

`npm test`

See the test directory for details and more verbose usage. Note that all tests use [tape](https://npmjs.org/package/tape) for its assertions. 
You can install it by running `npm install tape`. Then you should be good to go!!!!

license
=======

MIT

