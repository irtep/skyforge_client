export interface Lite {
    input: string;
    output: string;
};

export const lites: Lite[] = [
    // mana spells
    {
        input: 'magic missile',
        output: '<span class="magenta">magic missile</span>'
    },
    {
        input: 'golden arrow',
        output: '<span class="magenta">golden arrow</span>'
    },
    {
        input: 'levin bolt',
        output: '<span class="magenta">levin bolt</span>'
    },
    // fire spells

    {
        input: 'lava blast',
        output: '<span class="red">lava blast</span>'
    },
    {
        input: 'meteor blast',
        output: '<span class="red">meteor blast</span>'
    },
    {
        input: 'lava storm',
        output: '<span class="red">lava storm</span>'
    },
    // acid spells

    {
        input: 'acid blast',
        output: '<span class="green">acid blast</span>'
    },
    {
        input: 'acid storm',
        output: '<span class="green">acid storm</span>'
    },
    {
        input: 'acid ray',
        output: '<span class="green">acid ray</span>'
    },
    // poison spells

    {
        input: 'herbal poison blast',
        output: '<span class="green">herbal poison blast</span>'
    },
    {
        input: 'killing cloud',
        output: '<span class="green">killing cloud</span>'
    },
    {
        input: 'herbal poison spray',
        output: '<span class="green">herbal poison spray</span>'
    },
    {
        input: 'venom strike',
        output: '<span class="green">venom strike</span>'
    },
    // cold spells

    {
        input: 'cold ray',
        output: '<span class="cyan">cold ray</span>'
    },
    {
        input: 'hailstorm',
        output: '<span class="cyan">hailstorm</span>'
    },
    {
        input: 'icebolt',
        output: '<span class="cyan">icebolt</span>'
    },
    {
        input: 'rift pulse',
        output: '<span class="cyan">rift pulse</span>'
    },
    // elec spells

    {
        input: 'electrocution',
        output: '<span class="yellow">electrocution</span>'
    },
    {
        input: 'lighting storm',
        output: '<span class="yellow">lighting storm</span>'
    },
    {
        input: 'forked lightning',
        output: '<span class="yellow">forked lightning</span>'
    },
    // asphyx spells
    {
        input: 'blast vacuum',
        output: '<span class="cyan">blast vacuum</span>'
    },
    {
        input: 'vacuum globe',
        output: '<span class="cyan">vacuum globe</span>'
    },
    // psionic spells
    {
        input: 'psychic crush',
        output: '<span class="magenta">psychic crush</span>'

    },
    {
        input: 'bolt of knowledge',
        output: '<span class="magenta">bolt of knowledge</span>'

    },
    // druid spells

    {
        input: 'star light',
        output: '<span class="magenta">star light</span>'

    },
    {
        input: 'wither flesh',
        output: '<span class="green">wither flesh</span>'

    },
    {
        input: 'hoar frost',
        output: '<span class="cyan">hoar frost</span>'

    },
    // other
    {
        input: 'You are done with the chant.',
        output: '<span class="green">You are done with the chant.</span>'
    },
    {
        input: 'deposit',
        output: '<span class="gold">deposit</span>'
    },
    {
        input: 'tree',
        output: '<span class="green">tree</span>'
    },
    {
        input: 'updated',
        output: '<span class="magenta">updated</span>'
    }
];