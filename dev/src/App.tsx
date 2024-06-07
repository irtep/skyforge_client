import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import MudScreen from './components/MudScreen';

interface MessageResponse {
  type: string;
  data: string;
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [command, setCommand] = useState<string>('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!socket) {
      console.log('connecting: ');
      const newSocket = io('http://localhost:3333');  // Connect to the server
      setSocket(newSocket);

      newSocket.on('message', (response: MessageResponse) => {
        setMessages((prevMessages) => [...prevMessages, response.data]);
        console.log('response data: ', response.data);
        scrollToBottom();
      });
    }
  }, [socket]);

  // Scroll to bottom on component mount or when messages change
  useEffect(() => {
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
    <div className="App">
      <MudScreen
        messages={messages}
        setCommand={setCommand}
        command={command}
        socket={socket}
        messagesContainerRef={messagesContainerRef}
        inputRef={inputRef}
      />
    </div>
  );
};

export default App;