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
    },
    {
        name: 'war ensemble',
        starts: 'You feel full of battle rage! Victory is CERTAIN!',
        stops: 'The effect of war ensemble wears off.',
        target: false
    },
    {
        name: 'AOA',
        starts: 'You see a crystal clear shield fade into',
        stops: 'Your crystal clear shield fades',
        target: false
    },
    {
        name: 'iron will',
        starts: 'You feel protected from being stunned',
        stops: 'You feel no longer protected from being stunned',
        target: false
    },
    {
        name: 'see invis',
        starts: 'You feel you can see more than ever',
        stops: 'Your vision is less sensitive now',
        target: false
    },
    {
        name: 'floating',
        starts: 'You feel light, and rise into the',
        stops: 'You slowly descend until your feet',
        target: false
    },
    {
        name: 'iron will',
        starts: 'You feel protected from being stunned',
        stops: 'You feel no longer protected from being stunned',
        target: false
    },
    {
        name: 'folk prot',
        starts: 'You feel protected from',
        stops: 'protection fades',
        target: false
    },/*
    {  // possible conflict with folk prot so disabled, gotta think
        name: 'minor prot',
        starts: 'You feel slightly protected',
        stops: 'The minor protection fades away',
        target: false
    },*/
    {
        name: 'ceremony',
        starts: 'You perform the ceremony',
        stops: 'You have an unusual feeling as you',
        target: false
    },
    {
        name: 'Melody',
        starts: 'You embrace yourself with your melody',
        stops: 'The embracing melody subsides',
        target: false
    },    
    {
        name: 'Melody',
        starts: 'You into an embracing melody',
        stops: 'The embracing melody subsides',
        target: false
    },    
    {
        name: 'unstun',
        starts: 'chanting appears to do absolutely nothing',
        stops: `It doesn't hurt as much as it normally`,
        target: false
    },    
    {
        name: 'unpain',
        starts: 'You feel your will getting stronger',
        stops: 'You feel your will returning',
        target: false
    },        
    {
        name: 'AOH',
        starts: 'You feel burning hatred',
        stops: 'You feel your anger and hate',
        target: false
    },        
    {
        name: 'earthskin',
        starts: 'You feel your skin harden',
        stops: 'Your skin returns to its original texture',
        target: false
    },        
    {
        name: 'the shadow',
        starts: 'You feel the shadows embrace you',
        stops: 'The shadows clear off',
        target: false
    },        
    {
        name: 'familiar darkness',
        starts: 'Your Shadow Familiar starts moving around you,',
        stops: 'Your Shadow Familiar no longer maintains the Vanquish',
        target: false
    },        
    {
        name: 'lift of load',
        starts: 'You feel odd. Not stronger',
        stops: 'You feel odd. Not weaker',
        target: false
    },        
    {
        name: 'floating disc',
        starts: 'You summon a floating disc that starts following',
        stops: 'Your floating disc suddenly disappears',
        target: false
    }
];


//The pain increases as your body starts to push out organs and limbs that
//The extra organs retract back into your body
/**


*/