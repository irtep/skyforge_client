import { Button, Container, Input, Typography } from '@mui/material';
import React, { RefObject, useContext, useEffect, useRef, useState } from 'react';
import '../css/colors.css';
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
        }
        else if (e.key === 'ArrowDown') {
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
        // numpad movements
        else if (e.code === 'Numpad7') {
            if (socket) {
                socket.emit('command', 'nw');
                setCommand('');
            }
        }
        else if (e.code === 'Numpad8') {
            if (socket) {
                socket.emit('command', 'n');
                setCommand('');
            }
        }
        else if (e.code === 'Numpad9') {
            if (socket) {
                socket.emit('command', 'ne');
                setCommand('');
            }
        }
        else if (e.code === 'Numpad4') {
            if (socket) {
                socket.emit('command', 'w');
                setCommand('');
            }
        }
        else if (e.code === 'Numpad6') {
            if (socket) {
                socket.emit('command', 'e');
                setCommand('');
            }
        }
        else if (e.code === 'Numpad1') {
            if (socket) {
                socket.emit('command', 'sw');
                setCommand('');
            }
        }
        else if (e.code === 'Numpad2') {
            if (socket) {
                socket.emit('command', 's');
                setCommand('');
            }
        }
        else if (e.code === 'Numpad3') {
            if (socket) {
                socket.emit('command', 'se');
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
      const shortenedMessages = history.slice(-10);
      setHistory(shortenedMessages);
    }
    //console.log('history: ', history, historyIndex);
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
                {/*messages.map((message: any, index: number) => (
                    <div key={`msgs ${index}`} dangerouslySetInnerHTML={{ __html: message }} />
                ))*/}
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
                [version: test 0.2.2]
            </Typography>
        </Container>
    );
};

export default MudScreen;