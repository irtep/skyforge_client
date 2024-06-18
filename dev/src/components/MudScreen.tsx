import { Button, Container, Input } from '@mui/material';
import React, { Dispatch, RefObject, SetStateAction, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import '../css/colors.css';
import DOMPurify from 'dompurify';

interface MudScreenProps {
    messages: string[];
    command: string;
    setCommand: Dispatch<SetStateAction<string>>;
    socket: Socket | null;
    messagesContainerRef: RefObject<HTMLDivElement>
    inputRef: RefObject<HTMLInputElement>
    showButtons: boolean;
    fontSize: number;
}

const MudScreen: React.FC<MudScreenProps> = (props: MudScreenProps) => {

    const sendCommand = () => {
        if (props.socket) {
            props.socket.emit('command', props.command);

            if (props.inputRef.current) {
                props.inputRef.current.select();
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
        if (props.inputRef.current !== null) {
            props.inputRef.current.focus();
        }
    }, []);

    return (
        <Container>

            <Container
                id="messages"
                ref={props.messagesContainerRef}
                sx={{
                    background: 'black',
                    color: 'rgb(180,180,180)',
                    width: '100%',
                    height: '90vh',
                    overflowX: 'hidden',
                    overflowY: 'scroll',
                    fontFamily: '"Roboto Mono", monospace',
                    fontSize: `${props.fontSize}px`,
                    whiteSpace: 'pre-wrap',
                    paddingBottom: 5
                }}
            >
                {props.messages.map((message: any, index: number) => (
                    <div key={index} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message) }} />
                ))}
            </Container>

            <Input
                type="text"
                inputRef={props.inputRef}
                value={props.command}
                onChange={(e) => props.setCommand(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter command"
                sx={{background: 'lightGreen'}}
            />
            <Button onClick={sendCommand}>Send</Button>

        </Container>
    );
};

export default MudScreen;