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
    }
];


//The pain increases as your body starts to push out organs and limbs that
//The extra organs retract back into your body
/**

You feel your skin harden.
Your skin returns to its original texture.


You feel odd. Not stronger, but...

line:  ,-----------------------------------------------------------------------------.
App.tsx:202 line:  | 1.1  Caped          fol <span class="green"> 856<span class="normal">( 856) <span class="bold yellow"> 466<span class="normal">( 938) <span class="cyan">312<span class="normal">(315) |  79 |        99971 |
App.tsx:202 line:  | 1.2  Night          ldr <span class="cyan">1056<span class="normal">(1246) <span class="green"> 634<span class="normal">( 634) <span class="cyan">309<span class="normal">(400) | 100 |       116973 |
App.tsx:202 line:  `-----------------------------------------------------------------------------'
App.tsx:202 line:  | Night's soul        fol <span class="cyan">VERY high <span class="normal"> <span class="green">   full   <span class="normal"> <span class="green">  full  <span class="normal"> | ??? |              |
App.tsx:202 line:  `-----------------------------------------------------------------------------'
App.tsx:202 line:  The guard is in bad shape (35%).
App.tsx:202 line:  <span class="bold">You are casting 'hemorrhage'.<span class="normal">
App.tsx:202 line:  The guard's powerful bash sends Night sprawling to the floor.<span class="normal">
App.tsx:202 line:  You are done with the chant.<span class="normal">
App.tsx:208 starting with You:  You are done with the chant.<span class="normal">
App.tsx:202 line:  You clap your hands and whisper 'yugzhrr'<span class="normal">
App.tsx:208 starting with You:  You clap your hands and whisper 'yugzhrr'<span class="normal">
App.tsx:202 line:  The
App.tsx:234 --------
App.tsx:197 lines:  Array(20)
App.tsx:202 line:  <span class="bold white">********************** Round 5 **********************<span class="normal">
App.tsx:202 line:  Night's soul companion misses.
2App.tsx:202 line:  The guard misses.
App.tsx:202 line:  Night dodges.
App.tsx:202 line:  Night horribly shreds The guard.
App.tsx:202 line:  The guard dodges.
App.tsx:202 line:  You pierce The guard.
App.tsx:208 starting with You:  You pierce The guard.
App.tsx:215 hit:  (3) pierce
App.tsx:202 line:  You puncture The guard.
App.tsx:208 starting with You:  You puncture The guard.
App.tsx:215 hit:  (4) puncture
App.tsx:202 line:  ,-----------------------------------------------------------------------------.
App.tsx:202 line:  | 1.1  Caped          fol <span class="green"> 856<span class="normal">( 856) <span class="bold yellow"> 419<span class="normal">( 938) <span class="cyan">312<span class="normal">(315) |  79 |        99971 |
App.tsx:202 line:  | 1.2  Night          ldr <span class="cyan">1034<span class="normal">(1246) <span class="green"> 634<span class="normal">( 634) <span class="cyan">309<span class="normal">(400) | 100 |       116973 |
App.tsx:202 line:  `-----------------------------------------------------------------------------'
App.tsx:202 line:  | Night's soul        fol <span class="cyan">VERY high <span class="normal"> <span class="green">   full   <span class="normal"> <span class="green">  full  <span class="normal"> | ??? |              |
App.tsx:202 line:  `-----------------------------------------------------------------------------'
App.tsx:202 line:  The guard is in very bad shape (10%).
App.tsx:202 line:  <span class="bold">You are casting 'hemorrhage'.<span class="normal">
App.tsx:202 line:  <span class="bold green">You skillfully cast the spell with greater haste.<span class="normal">
App.tsx:202 line:  Hemorrhage: #
App.tsx:202 line:  
App.tsx:234 --------
App.tsx:197 lines:  (19) ['<span class="bold white">********************** Round 6 **********************<span class="normal">', 'Night dodges.', 'The guard misses.', 'The guard misses.', 'Night heavily shoves The guard with shield.', 'You puncture The guard.', 'You feel the chaos pulse inside you!', "Night utters a prayer for the fallen foe 'In nomine Faerwon. Amen.'", 'Your ring startles you as it briefly flashes <span class="green">green<span class="normal">.', 'Your ring startles you as it briefly flashes <span class="red">red<span class="normal">.', 'Your ring startles you as it briefly flashes <span class="yellow">yellow<span class="normal">.', 'The guard suddenly stops breathing and jerks a cou…es violently, then falls to the ground, lifeless.', 'The guard is DEAD, R.I.P.', 'familiar consume corpse', 'You sense the presence of hidden magical resources in you.', 'hp: <span class="cyan">856<span class="normal"> (8…0 [<span class="green">+997<span class="normal">]', 'You are done with the chant.<span class="normal">', 'Cast hemorrhage at what?<span class="normal">', 'hp: <span class="cyan">856<span class="normal"> (8…ss="normal">] cash: 660 [<span class="normal">] e']
App.tsx:202 line:  <span class="bold white">********************** Round 6 **********************<span class="normal">
App.tsx:202 line:  Night dodges.
2App.tsx:202 line:  The guard misses.
App.tsx:202 line:  Night heavily shoves The guard with shield.
App.tsx:202 line:  You puncture The guard.
App.tsx:208 starting with You:  You puncture The guard.
App.tsx:215 hit:  (4) puncture
App.tsx:202 line:  You feel the chaos pulse inside you!
App.tsx:208 starting with You:  You feel the chaos pulse inside you!
App.tsx:202 line:  Night utters a prayer for the fallen foe 'In nomine Faerwon. Amen.'
App.tsx:202 line:  Your ring startles you as it briefly flashes <span class="green">green<span class="normal">.
App.tsx:202 line:  Your ring startles you as it briefly flashes <span class="red">red<span class="normal">.
App.tsx:202 line:  Your ring startles you as it briefly flashes <span class="yellow">yellow<span class="normal">.
App.tsx:202 line:  The guard suddenly stops breathing and jerks a couple of times violently, then falls to the ground, lifeless.
App.tsx:202 line:  The guard is DEAD, R.I.P.
App.tsx:202 line:  familiar consume corpse
App.tsx:202 line:  You sense the presence of hidden magical resources in you.
App.tsx:208 starting with You:  You sense the presence of hidden magical resources in you.
App.tsx:202 line:  hp: <span class="cyan">856<span class="normal"> (859) [<span class="normal">] sp: <span class="bold yellow">419<span class="normal"> (941) [<span class="normal">] ep: <span class="cyan">312<span class="normal"> (317) [<span class="normal">] cash: 660 [<span class="normal">] exp: 205950 [<span class="green">+997<span class="normal">]
App.tsx:202 line:  You are done with the chant.<span class="normal">
App.tsx:208 starting with You:  You are done with the chant.<span class="normal">
App.tsx:202 line:  Cast hemorrhage at what?<span class="normal">



15
: 
"The guard is in bad shape (35%)."
16
: 
"<span class=\"bold\">You are casting 'hemorrhage'.<span class=\"normal\">"
17
: 
"The guard's powerful bash sends Night sprawling to the floor.<span class=\"normal\">"
18
: 
"You are done with the chant.<span class=\"normal\">"
19
: 
"You clap your hands and whisper 'yugzhrr'<span class=\"normal\">"
20
: 
"The"


15
: 
"The guard is in bad shape (35%)."
16
: 
"<span class=\"bold\">You are casting 'hemorrhage'.<span class=\"normal\">"
17
: 
"The guard's powerful bash sends Night sprawling to the floor.<span class=\"normal\">"
18
: 
"You are done with the chant.<span class=\"normal\">"
19
: 
"You clap your hands and whisper 'yugzhrr'<span class=\"normal\">"
20
: 
"The"
*/