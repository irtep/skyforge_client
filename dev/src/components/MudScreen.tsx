import { Button, Container, Input, Typography } from '@mui/material';
import React, { RefObject, useContext, useEffect, useRef, useState } from 'react';
import '../css/colors.css';
import DOMPurify from 'dompurify';
import { SkyContext } from '../context/skyContext';

interface MudScreenProps {
    messagesContainerRef: RefObject<HTMLDivElement>;
};

const MudScreen: React.FC<MudScreenProps> = ({ messagesContainerRef }) => {
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number>(-1);
    const {
        messages,
        setCommand,
        command,
        socket,
        fontSize
    } = useContext(SkyContext);

    const inputRef = useRef<HTMLInputElement>(null);

    const sendCommand = () => {
        if (socket) {
            socket.emit('command', command);

            // Save the command to the history
            setHistory((prevHistory: string[]) => [...prevHistory, command]);
            setHistoryIndex(-1); // Reset history index after sending command

            if (inputRef.current) {
                inputRef.current.select();
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Check if the Enter key is pressed
        if (e.key === 'Enter') {
            sendCommand();
        }
        else if (e.key === 'ArrowUp') {
            // Navigate to the previous command in history
            if (history.length > 0 && historyIndex < history.length - 1) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setCommand(history[history.length - 1 - newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            // Navigate to the next command in history
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setCommand(history[history.length - 1 - newIndex]);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setCommand('');
            }
        }
    };

    useEffect(() => {
        if (inputRef.current !== null) {
            inputRef.current.focus();
        }
    }, []);

  // Truncate command history if length exceeds 10
  useEffect(() => {
    if (history.length > 10) {
      const shortenedMessages = messages.slice(-10);
      setHistory(shortenedMessages);
    }
  }, [history]);

    return (
        <Container>
            <Container
                id="messages"
                ref={messagesContainerRef}
                sx={{
                    background: 'black',
                    color: 'rgb(180,180,180)',
                    width: '100%',
                    height: '90vh',
                    overflowX: 'hidden',
                    overflowY: 'scroll',
                    fontFamily: '"Roboto Mono", monospace',
                    fontSize: `${fontSize}px`,
                    whiteSpace: 'pre-wrap',
                    paddingBottom: 5
                }}
            >
                {messages.map((message: any, index: number) => (
                    <div key={index} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message) }} />
                ))}
            </Container>

            <Input
                type="text"
                inputRef={inputRef}
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter command"
                sx={{
                    background: 'lightGreen',
                    padding: 1
                }}
            />

            <Button onClick={sendCommand}>Send</Button>

            <Typography sx={{ color: "rgb(150,150,150)" }}>
                version beta 0.0.3
            </Typography>
        </Container>
    );
};

export default MudScreen;