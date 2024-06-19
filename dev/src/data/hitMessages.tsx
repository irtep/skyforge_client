export interface HitMsg {
    index: number | 'x';
    msg: string;
};

export const hitMessages: HitMsg[] = [
    // habo
    { index: 'x', msg: 'harm'},
    { index: 'x', msg: 'fail to reach'},
    // miss
    { index: 0, msg: 'miss'},
    { index: 0, msg: 'misses'},
    // slash
    { index: 0, msg: 'barely graze' },
    { index: 1, msg: 'solidly slash' },
    { index: 2, msg: 'gash' },
    { index: 3, msg: 'lightly cut' },
    { index: 4, msg: 'cut' },
    { index: 5, msg: 'tear' },
    { index: 6, msg: 'incise' },
    { index: 7, msg: 'shred' },
    { index: 8, msg: 'horribly shred' },
    { index: 9, msg: 'slash' },
    { index: 10, msg: 'incisively cut' },
    { index: 11, msg: 'incisively tear' },
    { index: 12, msg: 'slit' },
    { index: 13, msg: 'cruelly tatter' },
    { index: 14, msg: 'savagely shave' },
    { index: 15, msg: 'rive' },
    { index: 16, msg: 'cruelly slash' },
    { index: 17, msg: 'uncontrollably slash' },
    { index: 18, msg: 'quickly cut' },
    { index: 19, msg: 'savagely rip' },
    { index: 20, msg: 'BRUTALLY TEAR' },
    { index: 21, msg: 'SAVAGELY SHRED' },
    { index: 22, msg: 'CRUELLY REND' },
    { index: 23, msg: 'BARBARICALLY REND' },
    { index: 24, msg: 'DISMEMBER' },
    { index: 25, msg: 'CRUELLY DISMEMBER' },
    // pierce
    { index: 0, msg: 'barely scratch' },
    { index: 1, msg: 'scratch' },
    { index: 2, msg: 'slightly pierce' },
    { index: 3, msg: 'pierce' },
    { index: 4, msg: 'puncture' },
    { index: 5, msg: 'sink' },
    { index: 6, msg: 'bore' },
    { index: 7, msg: 'crater' },
    { index: 8, msg: 'cavitate' },
    { index: 9, msg: 'shaft' },
    { index: 10, msg: 'gorge' },
    { index: 11, msg: 'really poke' },
    { index: 12, msg: 'riddle' },
    { index: 13, msg: 'dig into' },
    { index: 14, msg: 'dig through' },
    { index: 15, msg: 'chasm' },
    { index: 16, msg: 'drill' },
    { index: 17, msg: 'powerfully perforate' },
    { index: 18, msg: 'powerfully pierce' },
    { index: 19, msg: 'cruelly crater' },
    { index: 20, msg: 'savagely shaft' },
    { index: 21, msg: 'uncontrollably dig through' },
    { index: 22, msg: 'REALLY DRILL' },
    { index: 23, msg: 'CRUELLY RIDDLE' },
    { index: 24, msg: 'BRUTALLY BORE' },
    { index: 25, msg: 'BARBARICALLY PIERCE' },
    // bash
    { index: 0, msg: 'lightly jostle' },
    { index: 1, msg: 'jostle' },
    { index: 2, msg: 'butt' },
    { index: 3, msg: 'bump' },
    { index: 4, msg: 'thump' },
    { index: 5, msg: 'stroke' },
    { index: 6, msg: 'thrust' },
    { index: 7, msg: 'jab' },
    { index: 8, msg: 'bash' },
    { index: 9, msg: 'strike' },
    { index: 10, msg: 'sock' },
    { index: 11, msg: 'cuff' },
    { index: 12, msg: 'knock' },
    { index: 13, msg: 'flail' },
    { index: 14, msg: 'whack' },
    { index: 15, msg: 'beat' },
    { index: 16, msg: 'smash' },
    { index: 17, msg: 'cruelly beat' },
    { index: 18, msg: 'badly smash' },
    { index: 19, msg: 'horribly thrust' },
    { index: 20, msg: 'savagely sock' },
    { index: 21, msg: 'savagely strike' },
    { index: 22, msg: 'REALLY WHACK' },
    { index: 23, msg: 'BRUTALLY BEAT' },
    { index: 24, msg: 'CRUELLY CUFF' },
    { index: 25, msg: 'BARBARICALLY BASH' },
    // shield
    { index: 0, msg: 'lightly shove' },
    { index: 1, msg: 'lightly batter' },
    { index: 2, msg: 'lightly push' },
    { index: 3, msg: 'lightly bash' },
    { index: 4, msg: 'lightly slam' },
    { index: 5, msg: 'lightly crush' },
    { index: 6, msg: 'heavily shove' },
    { index: 7, msg: 'batter' },
    { index: 8, msg: 'heavily push' },
    { index: 9, msg: 'heavily bash' },
    { index: 10, msg: 'slam' },
    { index: 11, msg: 'crush' },
    { index: 12, msg: 'really shove' },
    { index: 13, msg: 'really batter' },
    { index: 14, msg: 'really push' },
    { index: 15, msg: 'really bash' },
    { index: 16, msg: 'really slam' },
    { index: 17, msg: 'really crush' },
    { index: 18, msg: 'cruelly shove' },
    { index: 19, msg: 'cruelly batter' },
    { index: 20, msg: 'cruelly push' },
    { index: 21, msg: 'cruelly bash' },
    { index: 22, msg: 'REALLY SLAM' },
    { index: 23, msg: 'REALLY CRUSH' },
    { index: 24, msg: 'BRUTALLY CRUSH' },
    { index: 25, msg: 'BARBARICALLY SLAM' },
    // unarmed
    { index: 0, msg: 'pat' },
    { index: 1, msg: 'spank' },
    { index: 2, msg: 'smack' },
    { index: 3, msg: 'bitchslap' },
    { index: 4, msg: 'lightly strike' },
    { index: 5, msg: 'boot' },
    { index: 6, msg: 'kick' },
    { index: 7, msg: 'suckerpunch' },
    { index: 8, msg: 'ankle-stomp' },
    { index: 9, msg: 'stomp' },
    { index: 10, msg: 'knee-kick' },
    { index: 11, msg: 'badly kick' },
    { index: 12, msg: 'jump-kick' },
    { index: 13, msg: 'uppercut' },
    { index: 14, msg: 'kidneypunch' },
    { index: 15, msg: 'spin-kick' },
    { index: 16, msg: 'headbutt' },
    { index: 17, msg: 'cruelly headbutt' },
    { index: 18, msg: 'dragon-punch' },
    { index: 19, msg: 'savagely triple-kick' },
    { index: 20, msg: 'roundhouse' },
    { index: 21, msg: 'bodyslam' },
    { index: 22, msg: 'run into' },
    { index: 23, msg: 'REALLY SMASH' },
    { index: 24, msg: 'BRUTALLY BOOT' },
    { index: 25, msg: 'BARBARICALLY BEAT' },
    // monk martial arts
    { index: 0, msg: 'slap' },
    { index: 1, msg: 'push' },
    { index: 2, msg: 'shove' },
    { index: 3, msg: 'grab' },
    { index: 4, msg: 'punch' },
    { index: 5, msg: 'foot-sweep' },
    { index: 6, msg: 'evade, and then reverse' },
    { index: 7, msg: 'grab and shoulder-toss' },
    { index: 8, msg: 'snap-kick' },
    { index: 9, msg: 'joint-lock' },
    { index: 10, msg: 'unbalance, then expertly throw' },
    { index: 11, msg: 'stop-kick' },
    { index: 12, msg: 'reverse spin-kick' },
    { index: 13, msg: 'pull, then cruelly throat chop' },
    { index: 14, msg: 'trip and head-stomp' },
    { index: 15, msg: 'savagely hammerfist' },
    { index: 16, msg: 'craftily feint and then grab and flip' },
    { index: 17, msg: 'fluidly evade, duck under and spine-chop' },
    { index: 18, msg: 'nerve-grab, causing unendurable pain to' },
    { index: 19, msg: 'perform a lightning fast punch and throw combo on'},
    { index: 20, msg: 'grab, headbutt, then NECK-SNAP' },
    { index: 21, msg: 'masterfully evade then JUMP-KICK' },
    { index: 22, msg: 'DEVASTATINGLY HEAD-THROW' },
    { index: 23, msg: 'HORRIBLY DOUBLE-KICK' },
    { index: 24, msg: 'MASTERFULLY POWER-THROW' },
    { index: 25, msg: 'DEVASTATINGLY SNAP-KICK' },
    // tiger martial arts
    { index: 0, msg: 'tickle' },
    { index: 1, msg: 'step on' },
    { index: 2, msg: 'grasp' },
    { index: 3, msg: 'toe-kick' },
    { index: 4, msg: 'knee' },
    { index: 5, msg: 'elbow' },
    { index: 6, msg: 'elbow-smash' },
    { index: 7, msg: 'stomp-kick' },
    { index: 8, msg: 'foot-step' },
    { index: 9, msg: 'twist and throw' },
    { index: 10, msg: 'finger-jab' },
    { index: 11, msg: 'joint-twist' },
    { index: 12, msg: 'back kick' },
    { index: 13, msg: 'spinning back kick' },
    { index: 14, msg: 'phoenix-eye punch' },
    { index: 15, msg: 'spinning backfist' },
    { index: 16, msg: 'jump up and side-kick' },
    { index: 17, msg: 'dragon-claw' },
    { index: 18, msg: 'feint high and then cruelly groin-rip' },
    { index: 19, msg: 'snake-strike, blocking the chi of' },
    { index: 20, msg: 'pummel, with dozens of chain punches,' },
    { index: 21, msg: 'leap, spin, and swallow-tail KICK' },
    { index: 22, msg: 'DEVASTATE, with a thrusting blow,' },
    { index: 23, msg: 'BRUTALLY THROAT RIP' },
    { index: 24, msg: 'SAVAGELY BELLY SMASH' },
    { index: 25, msg: 'CRUELLY TIGER STRIKE' },
    // whip
    { index: 0, msg: 'lash' },
    { index: 1, msg: 'lightly lash' },
    { index: 2, msg: 'lightly flog' },
    { index: 3, msg: 'slightly slash' },
    { index: 4, msg: 'flog' },
    { index: 5, msg: 'slice' },
    { index: 6, msg: 'sharply slice' },
    { index: 7, msg: 'lightly flick' },
    { index: 8, msg: 'flick' },
    { index: 9, msg: 'whip' },
    { index: 10, msg: 'wantonly whip' },
    { index: 11, msg: 'welt' },
    { index: 12, msg: 'lightly blister' },
    { index: 13, msg: 'blister' },
    { index: 14, msg: 'badly flog' },
    { index: 15, msg: 'slightly gash' },
    { index: 16, msg: 'savagely cut' },
    { index: 17, msg: 'sharply cut' },
    { index: 18, msg: 'thrash' },
    { index: 19, msg: 'cruelly thrash' },
    { index: 20, msg: 'slightly slit' },
    { index: 21, msg: 'strap' },
    { index: 22, msg: 'lather' },
    { index: 23, msg: 'SADISTICALLY SLASH' },
    { index: 24, msg: 'MADLY THRASH' },
    { index: 25, msg: 'WILDLY WHIP' },
    // bite
    { index: 0, msg: 'sample' },
    { index: 1, msg: 'morsel' },
    { index: 2, msg: 'nibble' },
    { index: 3, msg: 'taste' },
    { index: 4, msg: 'bite' },
    { index: 5, msg: 'nip' },
    { index: 6, msg: 'really taste' },
    { index: 7, msg: 'snap' },
    { index: 8, msg: 'munch' },
    { index: 9, msg: 'chomp' },
    { index: 10, msg: 'gnaw' },
    { index: 11, msg: 'split' },
    { index: 12, msg: 'masticate' },
    { index: 13, msg: 'badly chomp' },
    { index: 14, msg: 'chew' },
    { index: 15, msg: 'rip' },
    { index: 16, msg: 'cruelly gnaw' },
    { index: 17, msg: 'cruelly chomp' },
    { index: 18, msg: 'savagely snap' },
    { index: 19, msg: 'brutally bite' },
    { index: 20, msg: 'meanly munch' },
    { index: 21, msg: 'really chew' },
    { index: 22, msg: 'horribly munch' },
    { index: 23, msg: 'SAVAGELY CHEW' },
    { index: 24, msg: 'UNCONTROLLABLY GNAW' },
    { index: 25, msg: 'BARBARICALLY BITE' },
    // claw
    { index: 0, msg: 'lightly claw' },
    { index: 1, msg: 'claw' },
    { index: 2, msg: 'barely scrape' },
    { index: 3, msg: 'scrape' },
    { index: 4, msg: 'prick' },
    { index: 5, msg: 'stick' },
    { index: 6, msg: 'lacerate' },
    { index: 7, msg: 'perforate' },
    { index: 8, msg: 'badly perforate' },
    { index: 9, msg: 'wound' },
    { index: 10, msg: 'badly wound' },
    { index: 11, msg: 'savagely claw' },
    { index: 12, msg: 'cruelly perforate' },
    { index: 13, msg: 'plunge' },
    { index: 14, msg: 'lightly eviscerate' },
    { index: 15, msg: 'ram' },
    { index: 16, msg: 'clash' },
    { index: 17, msg: 'savagely strike' },
    { index: 18, msg: 'eviscerate' },
    { index: 19, msg: 'cruelly rip' },
    { index: 20, msg: 'nastily plunge' },
    { index: 21, msg: 'cruelly ram' },
    { index: 22, msg: 'WHACK' },
    { index: 23, msg: 'RELENTLESSLY RAM' },
    { index: 24, msg: 'CRUELLY CLAW' },
    { index: 25, msg: 'BARBARICALLY LACERATE' },
    // breath
    { index: 0, msg: 'breath lightly' },
    { index: 1, msg: 'breath' },
    { index: 2, msg: 'snort' },
    { index: 3, msg: 'snort lightly' },
    { index: 4, msg: 'sneeze' },
    { index: 5, msg: 'sneeze softly' },
    { index: 6, msg: 'cough' },
    { index: 7, msg: 'gasp' },
    { index: 8, msg: 'gasp loudly' },
    { index: 9, msg: 'vomit' },
    { index: 10, msg: 'vomit profusely' },
    { index: 11, msg: 'choke' },
    { index: 12, msg: 'exhale' },
    { index: 13, msg: 'exhale quickly' },
    { index: 14, msg: 'blow' },
    { index: 15, msg: 'burp' },
    { index: 16, msg: 'burp loudly' },
    { index: 17, msg: 'hiccough' },
    { index: 18, msg: 'hiccough rapidly' },
    { index: 19, msg: 'sigh' },
    { index: 20, msg: 'sigh heavily' },
    { index: 21, msg: 'yawn' },
    { index: 22, msg: 'yawn widely' },
    { index: 23, msg: 'BREATH HARD' },
    { index: 24, msg: 'SNORT SAVAGELY' },
    { index: 25, msg: 'VICIOUSLY VOMIT' }
];