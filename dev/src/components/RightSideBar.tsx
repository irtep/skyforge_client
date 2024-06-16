import { Box, Button, Container, Switch } from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import ProtsBox from './ProtsBox';
import NewTrigger from './NewTrigger';
import { Trigger } from '../App';
import FontSizeSlider from './FontSizeSlider';
import EditTrigger from './EditTrigger';

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
}

const RightSideBar: React.FC<SideBarProps> = (props: SideBarProps): React.ReactElement => {
    const [newTriggerDialogOpen, setNewTriggerDialogOpen] = useState<boolean>(false);
    const [editTriggerDialogOpen, setEditTriggerDialogOpen] = useState<boolean>(false);

    return (
        <Box sx={{ background: 'white', height: '100%', padding: 2 }}>

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
                    <>
                        Font size:
                        <FontSizeSlider
                            setFontSize={props.setFontSize}
                            fontSize={props.fontSize}
                        />
                        Show settings:
                    </> : <></>
            }

            {
                props.showProts ?
                    <>

                        <ProtsBox
                            partyProts={props.partyProts}
                        />

                    </> : <></>
            }

            {
                props.showButtons ?
                    <Container>

                        <Button
                            onClick={() => { setEditTriggerDialogOpen(true) }}
                        >
                            Edit old trigger
                        </Button>

                        <Button
                            onClick={() => { setNewTriggerDialogOpen(true) }}
                        >Create new trigger</Button><br />

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

                    </Container> : <></>
            }

        </Box>
    );
};

export default RightSideBar;