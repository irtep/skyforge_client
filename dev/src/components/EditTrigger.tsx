import { Button, Dialog, DialogTitle, MenuItem, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Trigger } from '../App';

interface EditTriggerProps {
    editTriggerDialogOpen: boolean;
    setEditTriggerDialogOpen: Dispatch<SetStateAction<boolean>>;
    triggers: Trigger[];
    setTriggers: Dispatch<SetStateAction<Trigger[]>>;
}

const EditTrigger: React.FC<EditTriggerProps> = ({
    editTriggerDialogOpen,
    setEditTriggerDialogOpen,
    triggers,
    setTriggers
}: EditTriggerProps): React.ReactElement => {
    const [selectedTriggerId, setSelectedTriggerId] = useState<number | ''>('');
    const [name, setName] = useState<string>('');
    const [pattern, setPattern] = useState<string>('');
    const [action, setAction] = useState<string>('');

    const formRef = useRef<HTMLFormElement>(null);

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const selectedId = event.target.value === '' ? '' : Number(event.target.value);
        setSelectedTriggerId(selectedId);
        
        const foundTrigger = triggers.find(t => t.id === selectedId) || null;
        if (foundTrigger) {
            setName(foundTrigger.name);
            setPattern(foundTrigger.pattern);
            setAction(foundTrigger.action);
        } else {
            setName('');
            setPattern('');
            setAction('');
        }
    };

    const save = (e: React.FormEvent): void => {
        e.preventDefault();
        if (selectedTriggerId === '') return;

        const updatedTriggers = triggers.map(t => 
            t.id === selectedTriggerId 
            ? { ...t, name, pattern, action }
            : t
        );

        localStorage.setItem("triggers", JSON.stringify(updatedTriggers));
        setTriggers(updatedTriggers);
        setEditTriggerDialogOpen(false);
    };

    const cancelSend = (): void => {
        setEditTriggerDialogOpen(false);
    };

    useEffect(() => {
        if (!editTriggerDialogOpen) {
            setSelectedTriggerId('');
            setName('');
            setPattern('');
            setAction('');
        }
    }, [editTriggerDialogOpen]);

    return (
        <Dialog
            maxWidth="lg"
            fullWidth
            open={editTriggerDialogOpen}
            onClose={cancelSend}
        >
            <DialogTitle>Edit a Trigger</DialogTitle>
            <Stack
                spacing={2}
                component="form"
                onSubmit={save}
                ref={formRef}
            >
                <Select
                    value={selectedTriggerId === '' ? '' : String(selectedTriggerId)}
                    onChange={(e) => handleSelectChange(e as SelectChangeEvent<string>)}
                    displayEmpty
                >
                    <MenuItem value="" disabled>Select a trigger</MenuItem>
                    {triggers.map((trigger: Trigger) => (
                        <MenuItem key={trigger.id} value={String(trigger.id)}>
                            {trigger.name}
                        </MenuItem>
                    ))}
                </Select>

                <TextField
                    required
                    name="nameOfTrigger"
                    label="Name of Trigger"
                    fullWidth
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    required
                    name="patternOfTrigger"
                    label="Pattern of Trigger"
                    fullWidth
                    variant="outlined"
                    value={pattern}
                    onChange={(e) => setPattern(e.target.value)}
                />
                <TextField
                    required
                    name="actionOfTrigger"
                    label="Action of Trigger"
                    fullWidth
                    variant="outlined"
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                />
                <Button
                    variant="contained"
                    type="submit"
                >
                    Save
                </Button>
                <Button
                    variant="outlined"
                    onClick={cancelSend}
                >
                    Cancel
                </Button>
            </Stack>
        </Dialog>
    );
};

export default EditTrigger;
