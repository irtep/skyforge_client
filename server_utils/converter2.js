/*
    Test done: (26.11.2026 14:00) - STATUS = OK
    -------------------------------------------

    TODO: Fix and remove extra telnet characters from text
*/

const attributes = {
    0: 'normal', 1: 'bold', 4: 'underline',
    30: 'black', 31: 'red', 32: 'green', 33: 'yellow',
    34: 'blue', 35: 'magenta', 36: 'cyan', 37: 'white',
    40: 'black-bg', 41: 'red-bg', 42: 'green-bg', 43: 'yellow-bg',
    44: 'blue-bg', 45: 'magenta-bg', 46: 'cyan-bg', 47: 'white-bg'
};

export class AnsiStreamConverter {
    constructor() {
        this.buffer = '';        // Stores the beginning of an interrupted ANSI code for the next chunk
        this.activeClasses = []; // Remembers which classes are active between segments
        this.activeStyles = [];  // Remembers active Truecolor styles
    }

    convertChunk(data) {
        // Combine the incomplete code from the previous piece with the beginning of the new piece
        data = this.buffer + data;
        this.buffer = '';

        // Escape HTML characters
        data = data.replace(/</g, '&lt;').replace(/>/g, '&gt;');

        // Locate and store any incomplete ANSI code left at the end of the chunk (e.g., "\x1b[3")
        const incompleteMatch = data.match(/[\x1b\u001b](?:\[[0-9;]*)?$/);
        if (incompleteMatch) {
            this.buffer = incompleteMatch;
            data = data.slice(0, incompleteMatch.index);
        }

        let html = '';
        let isSpanOpen = false;

        // If any color from the previous piece remains, remove it right at the start of the new piece
        if (this.activeClasses.length > 0 || this.activeStyles.length > 0) {
            html += this._buildSpanTag();
            isSpanOpen = true;
        }

        // Split the text into parts at the ANSI codes
        const parts = data.split(/([\x1b\u001b]\[[0-9;]*m)/g);

        for (const part of parts) {
            if (!part) continue;

            const ansiMatch = part.match(/^[\x1b\u001b]\[([0-9;]*)m$/);
            if (ansiMatch) {
                if (isSpanOpen) {
                    html += '</span>';
                    isSpanOpen = false;
                }

                this._updateState(ansiMatch[1]);

                if (this.activeClasses.length > 0 || this.activeStyles.length > 0) {
                    html += this._buildSpanTag();
                    isSpanOpen = true;
                }
            } else {
                html += part;
            }
        }

        // Close the <span> for this piece, so that each piece is valid HTML
        // (The state is still preserved in the `this.activeClasses` and `this.activeStyles` variables!)
        if (isSpanOpen) {
            html += '</span>';
        }

        return html;
    }

        _updateState(codeString) {
        if (!codeString || codeString === '0') {
            this.activeClasses = [];
            this.activeStyles = [];
            return;
        }

        // We categorize colors and styles so that we know which legacy class the new code replaces.
        const fgClasses = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
        const bgClasses = ['black-bg', 'red-bg', 'green-bg', 'yellow-bg', 'blue-bg', 'magenta-bg', 'cyan-bg', 'white-bg'];

        const codes = codeString.split(';').map(Number);
        for (let i = 0; i < codes.length; i++) {
            const code = codes[i];

            if (code === 0) {
                this.activeClasses = [];
                this.activeStyles = [];
            } else if (code === 22) {
                // MUDs use code 22 to remove bold formatting without resetting the entire color.
                this.activeClasses = this.activeClasses.filter(c => c !== 'bold');
            } else if (code === 24) {
                // Code 24 removes the underline
                this.activeClasses = this.activeClasses.filter(c => c !== 'underline');
            } else if (code === 39) {
                // Code 39 resets only the text color to the default.
                this.activeClasses = this.activeClasses.filter(c => !fgClasses.includes(c));
                this.activeStyles = this.activeStyles.filter(s => !s.startsWith('color:'));
            } else if (code === 49) {
                // Code 49 resets only the background color to the default.
                this.activeClasses = this.activeClasses.filter(c => !bgClasses.includes(c));
                this.activeStyles = this.activeStyles.filter(s => !s.startsWith('background-color:'));
            } else if (code === 38 && codes[i + 1] === 2 && codes.length >= i + 5) {
                // New Truecolor text color: both the old Truecolor and the 16-color text class are removed
                this.activeClasses = this.activeClasses.filter(c => !fgClasses.includes(c));
                this.activeStyles = this.activeStyles.filter(s => !s.startsWith('color:'));
                this.activeStyles.push(`color: rgb(${codes[i + 2]}, ${codes[i + 3]}, ${codes[i + 4]})`);
                i += 4;
            } else if (code === 48 && codes[i + 1] === 2 && codes.length >= i + 5) {
                // New Truecolor background color: remove the old background color
                this.activeClasses = this.activeClasses.filter(c => !bgClasses.includes(c));
                this.activeStyles = this.activeStyles.filter(s => !s.startsWith('background-color:'));
                this.activeStyles.push(`background-color: rgb(${codes[i + 2]}, ${codes[i + 3]}, ${codes[i + 4]})`);
                i += 4;
            } else if (attributes[code]) {
                const attrName = attributes[code];

                if (fgClasses.includes(attrName)) {
                    // If a new 16-color text color (e.g., yellow) is added, the old one (e.g., green) and Truecolor are removed
                    this.activeClasses = this.activeClasses.filter(c => !fgClasses.includes(c));
                    this.activeStyles = this.activeStyles.filter(s => !s.startsWith('color:'));
                } else if (bgClasses.includes(attrName)) {
                    // If a new background color is added, the old background color is removed
                    this.activeClasses = this.activeClasses.filter(c => !bgClasses.includes(c));
                    this.activeStyles = this.activeStyles.filter(s => !s.startsWith('background-color:'));
                }

                if (!this.activeClasses.includes(attrName)) {
                    this.activeClasses.push(attrName);
                }
            }
        }
    }

    _buildSpanTag() {
        const classAttr = this.activeClasses.length > 0 ? ` class="${this.activeClasses.join(' ')}"` : '';
        const styleAttr = this.activeStyles.length > 0 ? ` style="${this.activeStyles.join('; ')}"` : '';
        return `<span${classAttr}${styleAttr}>`;
    }
}

const converter = new AnsiStreamConverter();

export const convert = (data) => {
    return converter.convertChunk(data);
};