import { Button, Container, Input, Typography } from '@mui/material';
import React, { RefObject, useContext, useEffect, useRef } from 'react';
import '../css/colors.css';
import DOMPurify from 'dompurify';
import { SkyContext } from '../context/skyContext';

interface MudScreenProps {
    messagesContainerRef: RefObject<HTMLDivElement>;
};

const MudScreen: React.FC<MudScreenProps> = ({ messagesContainerRef}) => {

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
    };

    useEffect(() => {
        if (inputRef.current !== null) {
            inputRef.current.focus();
        }
    }, []);

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
            <Typography sx={{color: "rgb(150,150,150)"}}>
                version beta 0.0.2
            </Typography>
        </Container>
    );
};

export default MudScreen;