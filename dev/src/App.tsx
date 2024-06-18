import React, { useContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import MudScreen from './components/MudScreen';
import { Box, Grid } from '@mui/material';
import RightSideBar from './components/RightSideBar';
import { SkyContext } from './context/skyContext';

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
    showProts
  } = useContext(SkyContext);

  const messagesContainerRef = useRef<HTMLDivElement>(null);

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

  // Scroll to bottom on component mount or when messages change
  useEffect(() => {

    if (messages.length > 100) {
      let shortenedMessages = messages;

      for (; shortenedMessages?.length > 90;) {
        shortenedMessages.shift();
      }

      setMessages(shortenedMessages);
    }

    // match triggers
    if (triggers.length > 0) {
      triggers.forEach((trig: Trigger) => {
        const checkThis = messages[messages.length - 1].includes(trig.pattern);

        if (checkThis && socket) {
          socket.emit('command', trig.action);
        }
      });
    }

    scrollToBottom();
  }, [messages]);

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
  /*
    useEffect(() => {
      console.log('btnss:', widths);
    })
  */
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