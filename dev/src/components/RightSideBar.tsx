import { Box, Button, Container, Switch } from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import ProtsBox from './ProtsBox';
import NewTrigger from './NewTrigger';
import { Trigger } from '../App';

interface SideBarProps {
    showProts: boolean;
    setShowProts: Dispatch<SetStateAction<boolean>>;
    showButtons: boolean;
    setShowButtons: Dispatch<SetStateAction<boolean>>;
    partyProts: string;
    triggers: Trigger[];
    setTriggers: Dispatch<SetStateAction<Trigger[]>>;
}

const RightSideBar: React.FC<SideBarProps> = (props: SideBarProps): React.ReactElement => {
    const [newTriggerDialogOpen, setNewTriggerDialogOpen] = useState<boolean>(false);
    return (
        <Box sx={{ background: 'white', height: '100%', padding: 2 }}>

            Show prots box:

            <Switch
                checked={props.showProts}
                onChange={(e) => {
                    props.setShowProts(e.target.checked);
                }}
                inputProps={{ 'aria-label': 'controlled' }}
            />

            Show buttons:

            <Switch
                checked={props.showButtons}
                onChange={(e) => {
                    props.setShowButtons(e.target.checked);
                }}
                inputProps={{ 'aria-label': 'controlled' }}
            />

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
                            onClick={ () => { setNewTriggerDialogOpen(true) }}
                        >
                            Edit old trigger
                        </Button>

                        <Button
                            onClick={ () => { setNewTriggerDialogOpen(true) }}
                        >Create new trigger</Button><br />

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