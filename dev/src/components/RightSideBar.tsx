import { Box, Button, Container, Switch } from '@mui/material';
import React, { useContext, useState } from 'react';
import ProtsBox from './ProtsBox';
import NewTrigger from './NewTrigger';
import { ButtonItem } from '../App';
import FontSizeSlider from './FontSizeSlider';
import EditTrigger from './EditTrigger';
import EditButton from './EditButton';
import NewButton from './NewButton';
import WidthSlider from './WidthSlider';
import { SkyContext } from '../context/skyContext';
import HitStatistics from './HitStatistics';

const RightSideBar: React.FC = (): React.ReactElement => {

    const {
        showProts,
        setShowProts,
        showButtons,
        setShowButtons,
        triggers,
        setTriggers,
        setFontSize,
        fontSize,
        showSettings,
        setShowSettings,
        savedButtons,
        setSavedButtons,
        socket,
        hitCalculator,
        setHitCalculator
    } = useContext(SkyContext);

    const [newTriggerDialogOpen, setNewTriggerDialogOpen] = useState<boolean>(false);
    const [editTriggerDialogOpen, setEditTriggerDialogOpen] = useState<boolean>(false);
    const [newButtonDialogOpen, setNewButtonDialogOpen] = useState<boolean>(false);
    const [editButtonDialogOpen, setEditButtonDialogOpen] = useState<boolean>(false);

    const sendCommand = (cmd: string) => {
        if (socket) {
            socket.emit('command', cmd);
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
                checked={showSettings}
                onChange={(e) => {
                    setShowSettings(e.target.checked);
                }}
                inputProps={{ 'aria-label': 'controlled' }}
            />

            <br />

            Show prots box:
            <Switch
                checked={showProts}
                onChange={(e) => {
                    setShowProts(e.target.checked);
                }}
                inputProps={{ 'aria-label': 'controlled' }}
            />

            <br />

            Show buttons:
            <Switch
                checked={showButtons}
                onChange={(e) => {
                    setShowButtons(e.target.checked);
                }}
                inputProps={{ 'aria-label': 'controlled' }}
            />

            <br />

            Show hit stats:
            <Switch
                checked={hitCalculator.show}
                sx={{
                    '& .Mui-checked': {
                        color: 'red', // Change the color here
                    },
                    '& .Mui-checked + .MuiSwitch-track': {
                        backgroundColor: 'darkRed', // Change the track color here
                    },
                }}
                onChange={(e) => {
                    setHitCalculator({
                        ...hitCalculator,
                        show: e.target.checked
                    });
                }}
                inputProps={{ 'aria-label': 'controlled' }}
            />

            {
                showSettings ?
                    <Container>
                        Font size:
                        <FontSizeSlider
                            setFontSize={setFontSize}
                            fontSize={fontSize}
                        />
                        Side bar size
                        <WidthSlider />
                        <Button
                            variant="contained"
                            size="small"
                            sx={{ margin: 1 }}
                            onClick={() => { setEditTriggerDialogOpen(true) }}
                        >Edit old trigger
                        </Button>

                        <Button
                            variant="contained"
                            size="small"
                            sx={{ margin: 1 }}
                            onClick={() => { setNewTriggerDialogOpen(true) }}
                        >Create new trigger</Button><br />
                        <Button
                            variant="contained"
                            size="small"
                            sx={{ margin: 1, background: "navy" }}
                            onClick={() => { setEditButtonDialogOpen(true) }}
                        >
                            Edit old button
                        </Button>

                        <Button
                            variant="contained"
                            size="small"
                            sx={{ margin: 1, background: "navy" }}
                            onClick={() => { setNewButtonDialogOpen(true) }}
                        >Create new button</Button><br />
                        <EditTrigger
                            editTriggerDialogOpen={editTriggerDialogOpen}
                            setEditTriggerDialogOpen={setEditTriggerDialogOpen}
                            triggers={triggers}
                            setTriggers={setTriggers}
                        />

                        <NewTrigger />

                        <EditButton
                            editButtonDialogOpen={editButtonDialogOpen}
                            setEditButtonDialogOpen={setEditButtonDialogOpen}
                            savedButtons={savedButtons}
                            setSavedButtons={setSavedButtons}
                        />

                        <NewButton
                            newButtonDialogOpen={newButtonDialogOpen}
                            setNewButtonDialogOpen={setNewButtonDialogOpen}
                            savedButtons={savedButtons}
                            setSavedButtons={setSavedButtons}
                        />
                    </Container> : <></>
            }

            {
                showProts ?
                    <Container>
                        <ProtsBox />
                    </Container> : <></>
            }

            {
                showButtons ?
                    <Container>
                        {
                            savedButtons.map((b: ButtonItem, ix: number) => {
                                return (
                                    <span key={`button: ${ix}`}>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            sx={{ margin: 1 }}
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

            {
                hitCalculator.show ?
                    <Container>
                        <HitStatistics />
                    </Container> : <></>
            }

        </Box>
    );
};

export default RightSideBar;