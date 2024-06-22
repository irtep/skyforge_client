import React, { useContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import MudScreen from './components/MudScreen';
import { Box, Grid } from '@mui/material';
import RightSideBar from './components/RightSideBar';
import { SkyContext } from './context/skyContext';
import { hitMessages, HitMsg, votkRapierSpecials } from './data/hitMessages';

interface MessageResponse {
  type: string;
  data: string;
}

export interface Trigger {
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
    setHitCalculator
  } = useContext(SkyContext);

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Precompile regex patterns outside of useEffect to avoid recompilation on each render
  const hitRegexes = hitMessages.map(hitMsg => ({
    msg: hitMsg.msg,
    index: hitMsg.index,
    regex: (charName: string) => new RegExp(`\\b${charName}\\s${hitMsg.msg}\\b`),
    critRegex: (charName: string) => new RegExp(`\\bGrinning diabolically\\s${charName}\\s${hitMsg.msg}\\b`, 'i')
  }));

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

  // Function to scroll to the bottom of the messages container
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      // Set scrollTop to scrollHeight
      container.scrollTop = container.scrollHeight;
    }
  };

  // Truncate messages if length exceeds 40
  useEffect(() => {
    if (messages.length > 40) {
      const shortenedMessages = messages.slice(-30);
      setMessages(shortenedMessages);
    }
  }, [messages]);

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
  /*   // for debug
      useEffect(() => {
         console.log('hCals', hitCalculator);
      }, [hitCalculator])
  */
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