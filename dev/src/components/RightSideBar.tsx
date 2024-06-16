import { Box, Button, Container, Switch } from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import ProtsBox from './ProtsBox';
import NewTrigger from './NewTrigger';
import { Trigger, ButtonItem, Widths } from '../App';
import FontSizeSlider from './FontSizeSlider';
import EditTrigger from './EditTrigger';
import EditButton from './EditButton';
import NewButton from './NewButton';
import { Socket } from 'socket.io-client';
import WidthSlider from './WidthSlider';

interface SideBarProps {
    showProts: boolean;
    setShowProts: Dispatch<SetStateAction<boolean>>;
    showButtons: boolean;
    setShowButtons: Dispatch<SetStateAction<boolean>>;
    partyProts: string;
    triggers: Trigger[];
    setTriggers: Dispatch<SetStateAction<Trigger[]>>;
    fontSize: number;
    setFontSize: Dispatch<SetStateAction<number>>;
    showSettings: boolean;
    setShowSettings: Dispatch<SetStateAction<boolean>>;
    savedButtons: ButtonItem[];
    setSavedButtons: Dispatch<SetStateAction<ButtonItem[]>>;
    socket: Socket | null;
    widths: Widths;
    setWidths: Dispatch<SetStateAction<Widths>>;
}

const RightSideBar: React.FC<SideBarProps> = (props: SideBarProps): React.ReactElement => {
    const [newTriggerDialogOpen, setNewTriggerDialogOpen] = useState<boolean>(false);
    const [editTriggerDialogOpen, setEditTriggerDialogOpen] = useState<boolean>(false);
    const [newButtonDialogOpen, setNewButtonDialogOpen] = useState<boolean>(false);
    const [editButtonDialogOpen, setEditButtonDialogOpen] = useState<boolean>(false);

    const sendCommand = (cmd: string) => {
        if (props.socket) {
            props.socket.emit('command', cmd);
        }
    };

    return (
        <Box sx={{
            background: 'darkGreen', 
            height: '100%', 
            padding: 2,
            borderRadius: 5,
            color: 'rgb(200,200,200)'
            }}>

            Show settings
            <Switch
                checked={props.showSettings}
                onChange={(e) => {
                    props.setShowSettings(e.target.checked);
                }}
                inputProps={{ 'aria-label': 'controlled' }}
            />

            <br />

            Show prots box:
            <Switch
                checked={props.showProts}
                onChange={(e) => {
                    props.setShowProts(e.target.checked);
                }}
                inputProps={{ 'aria-label': 'controlled' }}
            />

            <br />

            Show buttons:
            <Switch
                checked={props.showButtons}
                onChange={(e) => {
                    props.setShowButtons(e.target.checked);
                }}
                inputProps={{ 'aria-label': 'controlled' }}
            />

            {
                props.showSettings ?
                    <Container>
                        Font size:
                        <FontSizeSlider
                            setFontSize={props.setFontSize}
                            fontSize={props.fontSize}
                        />
                        Side bar size
                        <WidthSlider
                            setWidths={props.setWidths}
                            widths={props.widths}
                        />
                        <Button
                            onClick={() => { setEditTriggerDialogOpen(true) }}
                        >Edit old trigger
                        </Button>

                        <Button
                            onClick={() => { setNewTriggerDialogOpen(true) }}
                        >Create new trigger</Button><br />
                        <Button
                            onClick={() => { setEditButtonDialogOpen(true) }}
                        >
                            Edit old button
                        </Button>

                        <Button
                            onClick={() => { setNewButtonDialogOpen(true) }}
                        >Create new button</Button><br />
                        <EditTrigger
                            editTriggerDialogOpen={editTriggerDialogOpen}
                            setEditTriggerDialogOpen={setEditTriggerDialogOpen}
                            triggers={props.triggers}
                            setTriggers={props.setTriggers}
                        />

                        <NewTrigger
                            newTriggerDialogOpen={newTriggerDialogOpen}
                            setNewTriggerDialogOpen={setNewTriggerDialogOpen}
                            triggers={props.triggers}
                            setTriggers={props.setTriggers}
                        />

                        <EditButton
                            editButtonDialogOpen={editButtonDialogOpen}
                            setEditButtonDialogOpen={setEditButtonDialogOpen}
                            savedButtons={props.savedButtons}
                            setSavedButtons={props.setSavedButtons}
                        />

                        <NewButton
                            newButtonDialogOpen={newButtonDialogOpen}
                            setNewButtonDialogOpen={setNewButtonDialogOpen}
                            savedButtons={props.savedButtons}
                            setSavedButtons={props.setSavedButtons}
                        />
                    </Container> : <></>
            }

            {
                props.showProts ?
                    <Container>

                        <ProtsBox
                            partyProts={props.partyProts}
                        />

                    </Container> : <></>
            }

            {
                props.showButtons ?
                    <Container>
                        {
                            props.savedButtons.map((b: ButtonItem, ix: number) => {
                                return (
                                    <span key={`button: ${ix}`}>
                                        <Button
                                            value={b.action}
                                            onClick={() => {
                                                sendCommand(b.action);
                                            }}
                                        >{b.name}</Button>
                                    </span>
                                )
                            })
                        }
                    </Container> : <></>
            }

        </Box>
    );
};

export default RightSideBar;