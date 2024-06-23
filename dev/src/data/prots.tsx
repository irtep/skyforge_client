export interface Prot {
    name: string;
    starts: string;
    stops: string;
    target: boolean;
    targetStartIndicator?: string[];
    targetStopIndicator?: string[];
};

export const prots: Prot[] = [
    {
        name: 'Damn armament',
        starts: 'You call a curse upon',
        stops: 'The curse on your',
        target: true,
        targetStartIndicator: ['upon', '.'],
        targetStopIndicator: ['The curse on your', 'ends']
    },
    {
        name: 'Black trance',
        starts: 'You trace magical runes over a beating heart and squeeze its fluids down your',
        stops: 'Your mind feels calm and normal once again.',
        target: false
    },
    {
        name: 'PFG',
        starts: 'A vile black aura surrounds you.',
        stops: 'You no longer have a vile black aura around you.',
        target: false
    },
    {
        name: 'Aura of irreverence',
        starts: 'but it comes with a feeling of true power.',
        stops: 'A dark green aura surrounding you slowly fades away',
        target: false
    },
    {
        name: 'Rusted blade',
        starts: 'You spread your own blood over your',
        stops: 'The layers of decay turn back into blood',
        target: true,
        targetStartIndicator: ['over your', ','],
        targetStopIndicator: ['The layers of decay turn back into blood', 'harmlessly']
    },
    {
        name: 'spawn',
        starts: 'The pain increases as your body starts to push out organs and limbs that',
        stops: 'The extra organs retract back into your body',
        target: false
    },
    {
        name: 'command blade',
        starts: 'Pushing your mind into the blade, you create a mental connection to it',
        stops: 'The connection between you and your blade fades',
        target: false
    }
];


//The pain increases as your body starts to push out organs and limbs that
//The extra organs retract back into your body
/**
 * Night utters the magic words 'Corporem Connecticut Corporee'
You feel somehow linked to Night!


The ship cruises northeast along the tradelane.
The connection between you and your blade fades away.
The ship cruises northeast along the tradelane.

Night starts concentrating on a new spell.
Night (report): Unstun -> caped
Night (report): Wis set
Night utters the magic words 'Paxus'
Night's chanting appears to do absolutely nothing.


<779/602/268> set: spr exp: 63308 wimpy: off parry 0>
Night utters the magic words 'harnaxan temnahecne'
You feel your will getting stronger.


wear frame;put all weapon in frame;get all armour from frame;eqset wear combat;get rapier from frame;wield rapier;get dragon shield from frame;wield dragon shield;put noeq in frame;get all nullium ring from frame;get all nullium from frame'.
<779/94/199> set: spr exp: 264485 wimpy: off parry 51>
Night (party): medi jne
Night grabs a piece of wood from the pile and tosses it into the f

*/