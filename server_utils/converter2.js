/*
    ALUSTAVASTI TESTATTU TOIMIVANA (26.11.2026 klo 0:15)
    ----------------------------------------------------

    TODO: sovittaa vanhan converter.js tiedoston tilalle ja säilyttää vanha converter.js tiedosto?
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
        this.buffer = '';        // Tallentaa katkenneen ANSI-koodin alun seuraavaa palaa varten
        this.activeClasses = []; // Muistaa päällä olevat luokat palojen välillä
        this.activeStyles = [];  // Muistaa päällä olevat Truecolor-tyylit
    }

    convertChunk(data) {
        // 0. Yhdistetään edellisen palan keskeneräinen koodi uuden palan alkuun
        data = this.buffer + data;
        this.buffer = '';

        // Suojataan HTML-merkit
        data = data.replace(/</g, '&lt;').replace(/>/g, '&gt;');

        // 1. Etsitään ja talletetaan palan loppuun jäänyt keskeneräinen ANSI-koodi (esim. "\x1b[3")
        const incompleteMatch = data.match(/[\x1b\u001b](?:\[[0-9;]*)?$/);
        if (incompleteMatch) {
            this.buffer = incompleteMatch;
            data = data.slice(0, incompleteMatch.index);
        }

        // Yhdistetään peräkkäiset kokonaiset koodit
        data = data.replace(/[\x1b\u001b]\[([0-9;]+)m[\x1b\u001b]\[([0-9;]+)m/g, '\x1b[$1;$2m');

        let html = '';
        let isSpanOpen = false;

        // Jos edellisestä palasta jäi väri päälle, avataan se heti uuden palan alussa
        if (this.activeClasses.length > 0 || this.activeStyles.length > 0) {
            html += this._buildSpanTag();
            isSpanOpen = true;
        }

        // Pilkotaan teksti osiin ANSI-koodien kohdalta
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

        // Suljetaan tämän palan <span>, jotta jokainen pala on validia HTML:ää
        // (Tila pysyy silti tallessa this.activeClasses / this.activeStyles -muuttujissa!)
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

        const codes = codeString.split(';').map(Number);
        for (let i = 0; i < codes.length; i++) {
            const code = codes[i];
            if (code === 0) {
                this.activeClasses = [];
                this.activeStyles = [];
            } else if (code === 38 && codes[i + 1] === 2 && codes.length >= i + 5) {
                this.activeStyles = this.activeStyles.filter(s => !s.startsWith('color:'));
                this.activeStyles.push(`color: rgb(${codes[i + 2]}, ${codes[i + 3]}, ${codes[i + 4]})`);
                i += 4;
            } else if (code === 48 && codes[i + 1] === 2 && codes.length >= i + 5) {
                this.activeStyles = this.activeStyles.filter(s => !s.startsWith('background-color:'));
                this.activeStyles.push(`background-color: rgb(${codes[i + 2]}, ${codes[i + 3]}, ${codes[i + 4]})`);
                i += 4;
            } else if (attributes[code]) {
                if (!this.activeClasses.includes(attributes[code])) {
                    this.activeClasses.push(attributes[code]);
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

/***************************
 *  When application starts:
 ***************************/
let mud_screen = document.getElementById('mudScreen');
let testi = '';

const converter = new AnsiStreamConverter();

// Pala 1: Loppuu keskeneräiseen vihreän värin koodiin "\x1b[3"
const pala1 = 'Olipa kerran \x1b[3';

// Pala 2: Alkaa loppuosalla "2m" -> muodostaa ehjän "\x1b[32m" koodin! Väri jää päälle.
const pala2 = '2mvihreä peikko, ';

// Pala 3: Jatkaa vihreänä, kunnes "\x1b[0m" nollaa värin ja aloittaa uuden Truecolor-värin
const pala3 = 'joka söi \x1b[0m\x1b[38;2;255;140;0mtaikaporkkanan\x1b[0m.';

console.log('Pala 1:', converter.convertChunk(pala1));
console.log('Pala 2:', converter.convertChunk(pala2));
console.log('Pala 3:', converter.convertChunk(pala3));

window.onload = (() => {
    
    testi += converter.convertChunk(pala1);
    testi += converter.convertChunk(pala2);
    testi += converter.convertChunk(pala3);

    mud_screen.innerHTML = testi;

});