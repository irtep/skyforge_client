import React, { useContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import MudScreen from './components/MudScreen';
import { Box, Grid } from '@mui/material';
import RightSideBar from './components/RightSideBar';
import { SkyContext } from './context/skyContext';
import { hitMessages, votkRapierSpecials } from './data/hitMessages';
import { Prot, prots } from './data/prots';

interface MessageResponse {
  type: string;
  data: string;
}

export interface ActiveProts {
  prot: Prot;
  msg: string;
  target: string;
}

export interface Trigger {
  id: number;
  name: string;
  pattern: string;
  action: string;
}

export interface ButtonItem {
  name: string;
  action: string;
}

export interface Widths {
  mudScreen: number;
  sideBar: number;
}

export interface CharacterStats {
  name: string;
  hits: any[] | null
};

interface HitCalculator {
  show: boolean;
  output: string;
  characterStats: CharacterStats[]
};

const App: React.FC = (): React.ReactElement => {

  const {
    messages,
    setMessages,
    socket,
    setSocket,
    triggers,
    setTriggers,
    setSavedButtons,
    widths,
    showProts,
    hitCalculator,
    setHitCalculator,
    activeProts,
    setActiveProts,
    setProtStopMsg
  } = useContext(SkyContext);

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Precompile regex patterns outside of useEffect to avoid recompilation on each render
  const hitRegexes = hitMessages.map(hitMsg => ({
    msg: hitMsg.msg,
    index: hitMsg.index,
    regex: (charName: string) => new RegExp(`\\b${charName}\\s${hitMsg.msg}\\b`),
    critRegex: (charName: string) => new RegExp(`\\bGrinning diabolically\\s${charName}\\s${hitMsg.msg}\\b`, 'i')
  }));

  // Function to scroll to the bottom of the messages container
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      // Set scrollTop to scrollHeight
      container.scrollTop = container.scrollHeight;
    }
  };

  const escapeRegExp = (string: string): string => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

  const extractTextBetweenStrings = (input: string, start: string, stop: string): string | null => {
    const escapedStart = escapeRegExp(start);
    const escapedStop = escapeRegExp(stop);
    const regex = new RegExp(`${escapedStart}(.*?)${escapedStop}`);
    const match = input.match(regex);
    return match ? match[1].trim() : null;
  }

  useEffect(() => {
    if (!socket) {
      console.log('connecting: ');
      const newSocket = io('http://localhost:3333');  // Connect to the server
      setSocket(newSocket);

      // input from batmud comes here
      newSocket.on('message', (response: MessageResponse) => {
        setMessages((prevMessages: string[]) => [...prevMessages, response.data]);
        scrollToBottom();
      });
    }
  }, [socket, triggers]);

  // Truncate messages if length exceeds 40
  useEffect(() => {
    if (messages.length > 40) {
      const shortenedMessages = messages.slice(-30);
      setMessages(shortenedMessages);
    }
  }, [messages]);

  // incoming prots
  useEffect(() => {
    if (prots.length > 0) {
      prots.forEach((prot: Prot) => {
        if (messages.length > 0 && messages[messages.length - 1].includes(prot.starts) && socket) {
          let msg: string = '';
          let possibleTarget: string = ''; 
          const lastMessage = messages[messages.length - 1];

          if (prot.target && prot.targetStartIndicator) {
            const match = extractTextBetweenStrings(lastMessage, prot.targetStartIndicator[0], prot.targetStartIndicator[1])

            console.log('match ', match);
            if (match && match[1]) {
              msg = `${prot.name} ("${match}")`;
              possibleTarget = match;
            } else {
              msg = prot.name;
            }
          } else {
            msg = prot.name;
          }

          setActiveProts([
            ...activeProts,
            { prot: prot, msg: msg, target: possibleTarget }
          ]);
        }
      });
    }
  }, [messages, setActiveProts, socket]);

  // ending prots
  useEffect( () => {
    if (activeProts.length > 0) {
      const lastMessage = messages[messages.length - 1];
      activeProts.forEach((prot: ActiveProts) => {
        if (messages.length > 0 && lastMessage.includes(prot.prot.stops) && socket) {
          if (prot.target) {
            console.log('found with target');
            setProtStopMsg(`${prot.prot.name} of ${prot.target} expired!`);
            setTimeout( () => { setProtStopMsg('') }, 4000);
            console.log(': ', prot.target, prot.prot.stops);
            setActiveProts(activeProts.filter( (aPro: ActiveProts) => !(aPro.prot.stops === prot.prot.stops && aPro.target === prot.target)));          
          
          } else {
            //console.log('found without target');
            setProtStopMsg(`${prot.prot.name} expired!`);
            setTimeout( () => { setProtStopMsg('') }, 4000);
            setActiveProts(activeProts.filter( (aPro: ActiveProts) => aPro.prot.stops !== prot.prot.stops));
          }
        }
      });
    }
  }, [messages, setActiveProts, socket]);

  // Handle triggers
  useEffect(() => {
    if (triggers.length > 0) {
      triggers.forEach((trig: Trigger) => {
        if (messages.length > 0 && messages[messages.length - 1].includes(trig.pattern) && socket) {
          socket.emit('command', trig.action);
        }
      });
    }
  }, [messages, triggers, socket]);

  // Hit calculator
  useEffect(() => {
    if (
      hitCalculator.show &&
      hitCalculator.characterStats.length > 0 &&
      messages.length > 0 &&
      messages[messages.length - 1].includes('*********** Round')
    ) {
      const lines = messages[messages.length - 1].split('\n').map((line: string) => line.trim());
      //console.log('lines: ', lines);
      const updatedStats = hitCalculator.characterStats.map((char: CharacterStats) => {
        const hits: any = { ...char.hits };

        lines.forEach((line: string) => {
          //console.log('line: ', line);
          let hitFound: boolean = false;
          if (
            line.startsWith(`${char.name} `) ||
            line.startsWith(`Grinning diabolically `
            )) {
            //console.log('starting with You: ', line);
            hitRegexes.forEach(({ regex, critRegex, msg, index }) => {
              if (!hitFound && !(line.includes(`You cut your own wrist`))) {
                if (regex(char.name).test(line)) {
                  const hitKey = `(${index}) ${msg}`;
                  hits[hitKey] = (hits[hitKey] || 0) + 1;
                  hitFound = true;
                  //console.log('hit: ', hitKey);
                } else if (critRegex(char.name).test(line)) {
                  const hitKey = `(${index}) ${msg}`;
                  hits[hitKey] = (hits[hitKey] || 0) + 1;
                  hitFound = true;
                  //console.log('hit: ', hitKey);
                }
              }
            });
          } if (
            votkRapierSpecials.some(start => line.startsWith(start)) &&
            !hitFound
          ) {
            const hitKey = `(S) rapier special`;
            hits[hitKey] = (hits[hitKey] || 0) + 1;
            hitFound = true;
            //console.log('hit', hitKey);
          }
        });
        //console.log('--------');
        return { ...char, hits };
      });

      setHitCalculator((prevCalculator: HitCalculator) => ({
        ...prevCalculator,
        characterStats: updatedStats,
      }));
    } /*else {
      
      console.log('not b round: ', messages[messages.length - 1]);
      console.log(
        hitCalculator.show,
        hitCalculator.characterStats.length > 0,
        messages.length > 0,
        messages[messages.length - 1].includes('********************** Round')
      );
      
    }*/
    //console.log('messages.length ', messages.length);
  }, [messages, hitCalculator.show]);

  // when component loads
  useEffect(() => {

    // create buttons, that are saved to localStorage
    const storedbuttons = localStorage.getItem("buttons");
    if (storedbuttons) {
      // If it exists, parse the JSON data into an array
      let parsedBtns: ButtonItem[] = JSON.parse(storedbuttons);
      setSavedButtons(parsedBtns);
    }
    // fetch triggers from localSession
    const storedTriggers = localStorage.getItem("triggers");
    if (storedTriggers) {
      // If it exists, parse the JSON data into an array
      let parsedTrigs: Trigger[] = JSON.parse(storedTriggers);
      setTriggers(parsedTrigs);
    }

  }, []);

  // Show party prots and effects
  /*
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (showProts) {
      interval = setInterval(() => {
        console.log('tikker');
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [showProts]);
  */
  // for debug
  useEffect(() => {
    console.log('debug', activeProts);
  }, [activeProts])


  useEffect(scrollToBottom, [messages]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        <Grid item xs={widths.mudScreen} sx={{
          margin: 0
        }}>
          <Box sx={{ height: '100%' }}>
            <MudScreen
              messagesContainerRef={messagesContainerRef}
            />
          </Box>
        </Grid>

        <Grid item xs={widths.sideBar} sx={{ margin: 0 }}>
          <RightSideBar />
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;