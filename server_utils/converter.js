/*
  This is from: https://github.com/dannytatom/muddy
  Most of the credit to him for this!
  I just modificated this a bit to suit my needs.
*/

/*
let attributes = {
    0: 'normal'
    , 1: 'bold'
    , 4: 'underline'
    , 30: 'black'
    , 31: 'red'
    , 32: 'green'
    , 33: 'yellow'
    , 34: 'blue'
    , 35: 'magenta'
    , 36: 'cyan'
    , 37: 'white'
    , 40: 'black-bg'
    , 41: 'red-bg'
    , 42: 'green-bg'
    , 43: 'yellow-bg'
    , 44: 'blue-bg'
    , 45: 'magenta-bg'
    , 46: 'cyan-bg'
    , 47: 'white-bg'
}

export const convert = (data) => {
    var matches = data.match(/\[((\d*);){0,2}(\d*)m/g)
    // Probably temporary, but otherwise it will try
    // to render whatever is in <> as a HTML tag.
    data = data.replace('<', '&lt;');
    data = data.replace('>', '&gt;');
    
    if (matches) {
        for (var i = 0; i < matches.length; i++) {
            var match = matches[i]
                , codes = match.replace('[', '').replace('m', '').split(';')
            for (var c = 0; c < codes.length; c++) {
                codes[c] = attributes[codes[c]]
            }
            data = data.replace(match, '<span class="' + codes.join(' ') + '">');
        }
    }
    // This is definitely a hack,
    // whatever it's trying to say is probably important.
    //
    // But since it comes back crazy characters,
    // I have no idea. :(
    data = data.replace(/ÿù/g, '');
    data = data.replace(//g, '');
    // final cleanUp attempt
    for (let i = 30; i < 38; i++) {
        data = data.replace("[" + i + "m", "");
        data = data.replace("[0;" + i + "m", "");
        data = data.replace("[1;" + i + "m", "");
        data = data.replace("[" + i + ";1m", "");
    }
    return data;
};
*/
let attributes = {
    0: 'normal',
    1: 'bold',
    4: 'underline',
    30: 'black',
    31: 'red',
    32: 'green',
    33: 'yellow',
    34: 'blue',
    35: 'magenta',
    36: 'cyan',
    37: 'white',
    40: 'black-bg',
    41: 'red-bg',
    42: 'green-bg',
    43: 'yellow-bg',
    44: 'blue-bg',
    45: 'magenta-bg',
    46: 'cyan-bg',
    47: 'white-bg'
};

export const convert = (data) => {
    // Escaping < and > to be displayed safely as text
    data = data.replace(/</g, '&lt;');
    data = data.replace(/>/g, '&gt;');

    // 1. Match standard ANSI and Truecolor sequences (looking for the \x1b or escape prefix)
    // Note: If your incoming string has raw escape chars missing, the regex below handles the remaining '[' 
    const ansiRegex = /(?:|\\x1b)?\[([\d;]+)m/g;

    data = data.replace(ansiRegex, (match, group) => {
        const codes = group.split(';').map(Number);
        let styles = [];
        let classes = [];

        for (let i = 0; i < codes.length; i++) {
            const code = codes[i];

            // Handle Truecolor Foreground: [38;2;R;G;Bm
            if (code === 38 && codes[i + 1] === 2) {
                const r = codes[i + 2];
                const g = codes[i + 3];
                const b = codes[i + 4];
                styles.push(`color: rgb(${r},${g},${b});`);
                i += 4; // Skip processed parameters
                continue;
            }

            // Handle Truecolor Background: [48;2;R;G;Bm
            if (code === 48 && codes[i + 1] === 2) {
                const r = codes[i + 2];
                const g = codes[i + 3];
                const b = codes[i + 4];
                styles.push(`background-color: rgb(${r},${g},${b});`);
                i += 4; // Skip processed parameters
                continue;
            }

            // Fallback to your classic 16-color attributes mapping
            if (attributes[code]) {
                classes.push(attributes[code]);
            }
        }

        // Build the span tag dynamically
        let attrString = '';
        if (classes.length > 0) attrString += `class="${classes.join(' ')}" `;
        if (styles.length > 0) attrString += `style="${styles.join(' ')}"`;

        return attrString ? `<span ${attrString.trim()}>` : '<span>';
    });

    // Removing unwanted MUD telnet/control characters
    data = data.replace(/ÿù/g, '');
    data = data.replace(//g, '');

    // Close all open <span> tags elegantly
    data = data.replace(/<\/span>(?!<\/span>)/g, '</span><span>');

    // Ensuring all spans are properly closed balancing checks
    let openSpans = (data.match(/<span/g) || []).length;
    let closeSpans = (data.match(/<\/span>/g) || []).length;
    while (closeSpans < openSpans) {
        data += '</span>';
        closeSpans++;
    }

    return data;
};

