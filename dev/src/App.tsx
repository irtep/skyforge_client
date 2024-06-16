import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import MudScreen from './components/MudScreen';
import { Box, Grid } from '@mui/material';
import RightSideBar from './components/RightSideBar';

interface MessageResponse {
  type: string;
  data: string;
}

export interface Trigger {
  name: string;
  pattern: string;
  action: string;
}

const App: React.FC = (): React.ReactElement => {
  const [messages, setMessages] = useState<string[]>([]);
  const [command, setCommand] = useState<string>('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showProts, setShowProts] = useState<boolean>(false);
  const [showButtons, setShowButtons] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [partyProts, setPartyProts] = useState<string>('');
  const [triggers, setTriggers] = useState<Trigger[]>([]);
  const [fontSize, setFontSize] = useState(12);

  useEffect(() => {
    if (!socket) {
      console.log('connecting: ');
      const newSocket = io('http://localhost:3333');  // Connect to the server
      setSocket(newSocket);

      // input from batmud comes here
      newSocket.on('message', (response: MessageResponse) => {
        setMessages((prevMessages) => [...prevMessages, response.data]);
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

    // check if triggers match
    // match triggers
    //console.log('trigger.length', triggers.length);
    if (triggers.length > 0) {
      //console.log('checking triggerst');
      triggers.forEach((trig: Trigger) => {
        const checkThis = messages[messages.length-1].includes(trig.pattern);
        //console.log('cheking for :', trig.pattern);
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

    // fetch triggers from localSession
    const storedTriggers = localStorage.getItem("triggers");
    if (storedTriggers) {
      // If it exists, parse the JSON data into an array
      let parsedTrigs: Trigger[] = JSON.parse(storedTriggers);
      setTriggers(parsedTrigs);
    }

  }, []);

  useEffect(() => {
    console.log('triggers:', triggers);
  })

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8} md={7} sx={{ flexBasis: '60%' }}>
          <Box sx={{ height: '100%' }}>

            <MudScreen
              messages={messages}
              setCommand={setCommand}
              command={command}
              socket={socket}
              messagesContainerRef={messagesContainerRef}
              inputRef={inputRef}
              showButtons={showButtons}
              fontSize={fontSize}
            />

          </Box>
        </Grid>

        <Grid item xs={12} sm={4} md={5} sx={{ flexBasis: '40%' }}>
          <RightSideBar
            showProts={showProts}
            setShowProts={setShowProts}
            showButtons={showButtons}
            setShowButtons={setShowButtons}
            partyProts={partyProts}
            triggers={triggers}
            setTriggers={setTriggers}
            setFontSize={setFontSize}
            fontSize={fontSize}
            showSettings={showSettings}
            setShowSettings={setShowSettings}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;