import { Box, Button, Container, Switch } from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import ProtsBox from './ProtsBox';
import NewTrigger from './NewTrigger';

interface SideBarProps {
    showProts: boolean;
    setShowProts: Dispatch<SetStateAction<boolean>>;
    showButtons: boolean;
    setShowButtons: Dispatch<SetStateAction<boolean>>;
    partyProts: string;
}

const RightSideBar: React.FC<SideBarProps> = (props: SideBarProps): React.ReactElement => {
    const [triggerDialogOpen, setTriggerDialogOpen] = useState<boolean>(false);
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
                            onClick={ () => { setTriggerDialogOpen(true) }}
                        >
                            Open Button Editor
                        </Button>

                        <Button
                            onClick={ () => { setTriggerDialogOpen(true) }}
                        >Open Trigger Editor</Button><br />

                        <NewTrigger
                            triggerDialogOpen={triggerDialogOpen}
                            setTriggerDialogOpen={setTriggerDialogOpen}
                        />

                    </Container> : <></>
            }

        </Box>
    );
};

export default RightSideBar;