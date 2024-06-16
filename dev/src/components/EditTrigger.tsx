import { Button, Dialog, DialogTitle, MenuItem, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Trigger } from '../App';

interface EditTriggerProps {
    editTriggerDialogOpen: boolean;
    setEditTriggerDialogOpen: Dispatch<SetStateAction<boolean>>;
    triggers: Trigger[];
    setTriggers: Dispatch<SetStateAction<Trigger[]>>;
}

const EditTrigger: React.FC<EditTriggerProps> = (props: EditTriggerProps): React.ReactElement => {
    const [selectedTrigger, setSelectedTrigger] = useState<Trigger | null>(null);
    const [name, setName] = useState<string>('');
    const [pattern, setPattern] = useState<string>('');
    const [action, setAction] = useState<string>('');

    const formRef = useRef<HTMLFormElement>(null);

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const foundTrigger = props.triggers.find(t => t.name === event.target.value) || null;
        if (foundTrigger) {
            setSelectedTrigger(foundTrigger);
            setName(foundTrigger.name);
            setPattern(foundTrigger.pattern);
            setAction(foundTrigger.action);
        } else {
            setSelectedTrigger(null);
            setName('');
            setPattern('');
            setAction('');
        }
    };

    const save = (e: React.FormEvent): void => {
        e.preventDefault();

        const updatedTriggers = props.triggers.map(t => 
            t.name === selectedTrigger?.name 
            ? { name, pattern, action }
            : t
        );

        localStorage.setItem("triggers", JSON.stringify(updatedTriggers));
        props.setTriggers(updatedTriggers);
        props.setEditTriggerDialogOpen(false);
    };

    const cancelSend = (): void => {
        props.setEditTriggerDialogOpen(false);
    };

    useEffect(() => {
        // Reset form when the dialog opens
        if (!props.editTriggerDialogOpen) {
            setSelectedTrigger(null);
            setName('');
            setPattern('');
            setAction('');
        }
    }, [props.editTriggerDialogOpen]);

    return (
        <Dialog
            maxWidth="lg"
            fullWidth={true}
            open={props.editTriggerDialogOpen}
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
                    value={selectedTrigger?.name || ''}
                    onChange={handleSelectChange}
                    displayEmpty
                >
                    <MenuItem value="" disabled>Select a trigger</MenuItem>
                    {props.triggers.map((trigger: Trigger, i: number) => (
                        <MenuItem key={i} value={trigger.name}>
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