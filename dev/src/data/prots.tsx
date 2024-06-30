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
    }
];


//The pain increases as your body starts to push out organs and limbs that
//The extra organs retract back into your body
/**

UI:
look at me
Caped Pete the Lich Catfolk (undead).
He is in excellent shape.
His fists are surrounded by infernal black flames!
	Caped's equipment:
Rig: Bamboo equipment frame |> Rixx-Tec IV <|  [68% full]
Ring: a golden ring
Head: white helmet of the defender labeled as fr::com::SF 
Amulet: a golden medallion with five onyxes labeled as fr::com 
Bracelet: an alabaster bracelet dripping with salt water 
Wielded in right hand: a round combat shield with a metal spike 
Finger: Ring of the Participant [**]
Finger: a tiny burning ring  
Belt: Sword-belt of resistance labeled as fr::com::SF
Both legs and upper body: crystallic amazon battlesuit labeled as SF::fr::aCom::com 
Both feet: the Shoes that were lost that were found, but could be lost again possibly labeled as fr::aCom::com
On boots: Buckle of the Wanderers
Surrounding: a deep black large shadow familiar
Tattoo: a tattoo of the symbol of chaos
Around the neck: the crystal pendant of the Navigators
Journal: a small black diary with a symbol of darkness
<812/898/295> set: combat exp: 16294 wimpy: off parry 0>

backend:
raw data:  look at me
Caped Pete the Lich Catfolk (undead).
He is in excellent shape.
His fists are surrounded by infernal black flames!
        Caped's equipment:
Rig: Bamboo equipment frame |> Rixx-Tec IV <| <red glow> [68% full]
Ring: a golden ring
Head: white helmet of the defender labeled as fr::com::SF <red glow>
Amulet: a golden medallion with five onyxes labeled as fr::com <red glow>
Bracelet: an alabaster bracelet dripping with salt water <red glow>
Wielded in right hand: a round combat shield with a metal spike <red glow>
Finger: Ring of the Participant [**]
Finger: a tiny burning ring <christmas glow> <red glow>
Belt: Sword-belt of resistance labeled as fr::com::SF
Both legs and upper body: crystallic amazon battlesuit labeled as SF::fr::aCom::com <red glow>
Both feet: the Shoes that were lost that were found, but could be lost again possibly labeled as fr::aCom::com
On boots: Buckle of the Wanderers
Surrounding: a deep black large shadow familiar
Tattoo: a tattoo of the symbol of chaos
Around the neck: the crystal pendant of the Navigators
Journal: a small black diary with a symbol of darkness
<812/898/295> set: combat exp: 16294 wimpy: off parry 0>ÿù
converted:  look at me
Caped Pete the Lich Catfolk (undead).
He is in excellent shape.
His fists are surrounded by infernal black flames!
        Caped's equipment:
Rig: <span class="bold magenta">Bamboo equipment frame |&gt; Rixx-Tec IV &lt;|<span class="normal"><span class="red"> <red glow><span class="normal"> [68% full]<span class="normal">
Ring: <span class="bold white">a golden ring<span class="normal">
Head: <span class="bold magenta">white helmet of the defender labeled as fr::com::SF<span class="normal"><span class="red"> <red glow><span class="normal"><span class="normal">
Amulet: <span class="bold magenta">a golden medallion with five onyxes labeled as fr::com<span class="normal"><span class="red"> <red glow><span class="normal"><span class="normal">
Bracelet: <span class="bold magenta">an alabaster bracelet dripping with salt water<span class="normal"><span class="red"> <red glow><span class="normal"><span class="normal">
Wielded in right hand: <span class="bold yellow">a round combat shield with a metal spike<span class="normal"><span class="red"> <red glow><span class="normal"><span class="normal">
Finger: <span class="bold magenta">Ring of the Participant [**]<span class="normal">
Finger: <span class="bold magenta"><span class="bold red">a tiny burning ring<span class="normal"> <span class="bold red"><christmas glow><span class="normal"><span class="normal"><span class="red"> <red glow><span class="normal"><span class="normal">
Belt: <span class="bold magenta">Sword-belt of resistance labeled as fr::com::SF<span class="normal">
Both legs and upper body: <span class="bold magenta">crystallic amazon battlesuit labeled as SF::fr::aCom::com<span class="normal"><span class="red"> <red glow><span class="normal"><span class="normal">
Both feet: <span class="bold magenta">the Shoes that were lost that were found, but could be lost again possibly labeled as fr::aCom::com<span class="normal">
On boots: <span class="bold white">Buckle of the Wanderers<span class="normal">
Surrounding: <span class="bold white">a deep black large shadow familiar<span class="normal">
Tattoo: <span class="bold white">a tattoo of the symbol of chaos<span class="normal">
Around the neck: <span class="bold white">the crystal pendant of the Navigators<span class="normal">
Journal: <span class="bold white">a small black diary with a symbol of darkness<span class="normal">
<812/898/295> set: combat exp: 16294 wimpy: off parry 0>

REACT:
response from server:
"look at me\r\n
Caped Pete the Lich Catfolk (undead).\r\n
He is in excellent shape.\r\n
His fists are surrounded by infernal black flames!\r\n\t
Caped's equipment:\r\n
Rig: <span class=\"bold magenta\">Bamboo equipment frame |&gt; Rixx-Tec IV &lt;|<span class=\"normal\"><span class=\"red\"> <red glow><span class=\"normal\"> [68% full]<span class=\"normal\">\r\n
Ring: <span class=\"bold white\">a golden ring<span class=\"normal\">\r\nHead: <span class=\"bold magenta\">white helmet of the defender labeled as fr::com::SF<span class=\"normal\"><span class=\"red\"> <red glow><span class=\"normal\"><span class=\"normal\">\r\nAmulet: <span class=\"bold magenta\">a golden medallion with five onyxes labeled as fr::com<span class=\"normal\"><span class=\"red\"> <red glow><span class=\"normal\"><span class=\"normal\">\r\nBracelet: <span class=\"bold magenta\">an alabaster bracelet dripping with salt water<span class=\"normal\"><span class=\"red\"> <red glow><span class=\"normal\"><span class=\"normal\">\r\nWielded in right hand: <span class=\"bold yellow\">a round combat shield with a metal spike<span class=\"normal\"><span class=\"red\"> <red glow><span class=\"normal\"><span class=\"normal\">\r\nFinger: <span class=\"bold magenta\">Ring of the Participant [**]<span class=\"normal\">\r\nFinger: <span class=\"bold magenta\"><span class=\"bold red\">a tiny burning ring<span class=\"normal\"> <span class=\"bold red\"><christmas glow><span class=\"normal\"><span class=\"normal\"><span class=\"red\"> <red glow><span class=\"normal\"><span class=\"normal\">\r\nBelt: <span class=\"bold magenta\">Sword-belt of resistance labeled as fr::com::SF<span class=\"normal\">\r\nBoth legs and upper body: <span class=\"bold magenta\">crystallic amazon battlesuit labeled as SF::fr::aCom::com<span class=\"normal\"><span class=\"red\"> <red glow><span class=\"normal\"><span class=\"normal\">\r\nBoth feet: <span class=\"bold magenta\">the Shoes that were lost that were found, but could be lost again possibly labeled as fr::aCom::com<span class=\"normal\">\r\nOn boots: <span class=\"bold white\">Buckle of the Wanderers<span class=\"normal\">\r\nSurrounding: <span class=\"bold white\">a deep black large shadow familiar<span class=\"normal\">\r\nTattoo: <span class=\"bold white\">a tattoo of the symbol of chaos<span class=\"normal\">\r\nAround the neck: <span class=\"bold white\">the crystal pendant of the Navigators<span class=\"normal\">\r\nJournal: <span class=\"bold white\">a small black diary with a symbol of darkness<span class=\"normal\">\r\n<812/898/295> set: combat exp: 16294 wimpy: off parry 0>"
in state variable:
"look at me\r\nCaped Pete the Lich Catfolk (undead).\r\nHe is in excellent shape.\r\nHis fists are surrounded by infernal black flames!\r\n\tCaped's equipment:\r\nRig: <span class=\"bold magenta\">Bamboo equipment frame |&gt; Rixx-Tec IV &lt;|<span class=\"normal\"><span class=\"red\"> <red glow><span class=\"normal\"> [68% full]<span class=\"normal\">\r\nRing: <span class=\"bold white\">a golden ring<span class=\"normal\">\r\nHead: <span class=\"bold magenta\">white helmet of the defender labeled as fr::com::SF<span class=\"normal\"><span class=\"red\"> <red glow><span class=\"normal\"><span class=\"normal\">\r\nAmulet: <span class=\"bold magenta\">a golden medallion with five onyxes labeled as fr::com<span class=\"normal\"><span class=\"red\"> <red glow><span class=\"normal\"><span class=\"normal\">\r\nBracelet: <span class=\"bold magenta\">an alabaster bracelet dripping with salt water<span class=\"normal\"><span class=\"red\"> <red glow><span class=\"normal\"><span class=\"normal\">\r\nWielded in right hand: <span class=\"bold yellow\">a round combat shield with a metal spike<span class=\"normal\"><span class=\"red\"> <red glow><span class=\"normal\"><span class=\"normal\">\r\nFinger: <span class=\"bold magenta\">Ring of the Participant [**]<span class=\"normal\">\r\nFinger: <span class=\"bold magenta\"><span class=\"bold red\">a tiny burning ring<span class=\"normal\"> <span class=\"bold red\"><christmas glow><span class=\"normal\"><span class=\"normal\"><span class=\"red\"> <red glow><span class=\"normal\"><span class=\"normal\">\r\nBelt: <span class=\"bold magenta\">Sword-belt of resistance labeled as fr::com::SF<span class=\"normal\">\r\nBoth legs and upper body: <span class=\"bold magenta\">crystallic amazon battlesuit labeled as SF::fr::aCom::com<span class=\"normal\"><span class=\"red\"> <red glow><span class=\"normal\"><span class=\"normal\">\r\nBoth feet: <span class=\"bold magenta\">the Shoes that were lost that were found, but could be lost again possibly labeled as fr::aCom::com<span class=\"normal\">\r\nOn boots: <span class=\"bold white\">Buckle of the Wanderers<span class=\"normal\">\r\nSurrounding: <span class=\"bold white\">a deep black large shadow familiar<span class=\"normal\">\r\nTattoo: <span class=\"bold white\">a tattoo of the symbol of chaos<span class=\"normal\">\r\nAround the neck: <span class=\"bold white\">the crystal pendant of the Navigators<span class=\"normal\">\r\nJournal: <span class=\"bold white\">a small black diary with a symbol of darkness<span class=\"normal\">\r\n<812/898/295> set: combat exp: 16294 wimpy: off parry 0>"


*/