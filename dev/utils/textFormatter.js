/*
app to format hit messages
usage node textFormatter.js
*/

console.log('starting');

const input = `
 1: breath lightly
 2: breath
 3: snort
 4: snort lightly
 5: sneeze
 6: sneeze softly
 7: cough
 8: gasp
 9: gasp loudly
10: vomit
11: vomit profusely
12: choke
13: exhale
14: exhale quickly
15: blow
16: burp
17: burp loudly
18: hiccough
19: hiccough rapidly
20: sigh
21: sigh heavily
22: yawn
23: yawn widely
24: BREATH HARD
25: SNORT SAVAGELY
26: VICIOUSLY VOMIT
`;

function formatInput(input) {
    const lines = input.trim().split('\n');
    const formattedOutput = lines.map((line, index) => {
        const colonIndex = line.indexOf(':');
        return {
            index: index,
            msg: line.substring(colonIndex + 2).trim()
        };
    });
    return formattedOutput;
}

const result = formatInput(input);
console.log(result);