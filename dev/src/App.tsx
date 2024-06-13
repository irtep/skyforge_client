import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import MudScreen from './components/MudScreen';
import { Box, Grid } from '@mui/material';
import RightSideBar from './components/RightSideBar';

interface MessageResponse {
  type: string;
  data: string;
}

const App: React.FC = (): React.ReactElement => {
  const [messages, setMessages] = useState<string[]>([]);
  const [command, setCommand] = useState<string>('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [showProts, setShowProts] = useState<boolean>(false);

  const [showButtons, setShowButtons] = useState<boolean>(false);

  const [partyProts, setPartyProts] = useState<string>('');

  useEffect(() => {
    if (!socket) {
      console.log('connecting: ');
      const newSocket = io('http://localhost:3333');  // Connect to the server
      setSocket(newSocket);

      // input from batmud comes here
      newSocket.on('message', (response: MessageResponse) => {
        setMessages((prevMessages) => [...prevMessages, response.data]);
        //console.log('response data: ', response.data);
        scrollToBottom();
      });
    }
  }, [socket]);

  // Scroll to bottom on component mount or when messages change
  useEffect(() => {

    if (messages.length > 100) {
      let shortenedMessages = messages;

      for (; shortenedMessages?.length > 90;) {
        shortenedMessages.shift();
      }

      setMessages(shortenedMessages);
    }
    scrollToBottom();
  }, [messages]);

  // Function to scroll to the bottom of the messages container
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      // Set scrollTop to scrollHeight
      container.scrollTop = container.scrollHeight;
    }
  };


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
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;