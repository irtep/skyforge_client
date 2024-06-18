import React, { useContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
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
    messages, setMessages,
    command, setCommand,
    socket, setSocket,
    showProts, setShowProts,
    showButtons, setShowButtons,
    showSettings, setShowSettings,
    partyProts, setPartyProts,
    triggers, setTriggers,
    fontSize, setFontSize,
    savedButtons, setSavedButtons,
    widths, setWidths
  } = useContext(SkyContext);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

    // check if triggers match
    // match triggers
    //console.log('trigger.length', triggers.length);
    if (triggers.length > 0) {
      //console.log('checking triggerst');
      triggers.forEach((trig: Trigger) => {
        const checkThis = messages[messages.length - 1].includes(trig.pattern);
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

        <Grid item xs={widths.sideBar} sx={{ margin: 0 }}>

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
            savedButtons={savedButtons}
            setSavedButtons={setSavedButtons}
            socket={socket}
            widths={widths}
            setWidths={setWidths}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;