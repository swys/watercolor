var colors = {
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
},
styles = {
    underline : '\u001b[4m',
    blink : '\u001b[5m',
};

colors.success = colors.green;
colors.warn = colors.yellow;
colors.error = colors.red;
styles.reset = colors.reset;

module.exports = {
    colors : colors,
    styles : styles
};
