import { Button, Dialog, DialogTitle, MenuItem, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

interface ButtonItem {
    name: string;
    action: string;
}

interface EditButtonProps {
    editButtonDialogOpen: boolean;
    setEditButtonDialogOpen: Dispatch<SetStateAction<boolean>>;
    savedButtons: ButtonItem[];
    setSavedButtons: Dispatch<SetStateAction<ButtonItem[]>>;
}

const EditButton: React.FC<EditButtonProps> = (props: EditButtonProps): React.ReactElement => {
    const [selectedButton, setSelectedButton] = useState<ButtonItem | null>(null);
    const [name, setName] = useState<string>('');
    const [action, setAction] = useState<string>('');

    const formRef = useRef<HTMLFormElement>(null);

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const foundButton = props.savedButtons.find(b => b.name === event.target.value) || null;
        if (foundButton) {
            setSelectedButton(foundButton);
            setName(foundButton.name);
            setAction(foundButton.action);
        } else {
            setSelectedButton(null);
            setName('');
            setAction('');
        }
    };

    const save = (e: React.FormEvent): void => {
        e.preventDefault();

        const updatedButtons = props.savedButtons.map(b => 
            b.name === selectedButton?.name 
            ? { name, action }
            : b
        );

        localStorage.setItem("buttons", JSON.stringify(updatedButtons));
        props.setSavedButtons(updatedButtons);
        props.setEditButtonDialogOpen(false);
    };

    const cancelSend = (): void => {
        props.setEditButtonDialogOpen(false);
    };

    useEffect(() => {
        // Reset form when the dialog opens
        if (!props.editButtonDialogOpen) {
            setSelectedButton(null);
            setName('');
            setAction('');
        }
    }, [props.editButtonDialogOpen]);

    return (
        <Dialog
            maxWidth="lg"
            fullWidth={true}
            open={props.editButtonDialogOpen}
            onClose={cancelSend}
        >
            <DialogTitle>Edit a Button</DialogTitle>
            <Stack
                spacing={2}
                component="form"
                onSubmit={save}
                ref={formRef}
            >
                <Select
                    value={selectedButton?.name || ''}
                    onChange={handleSelectChange}
                    displayEmpty
                >
                    <MenuItem value="" disabled>Select a button</MenuItem>
                    {props.savedButtons.map((button: ButtonItem, i: number) => (
                        <MenuItem key={i} value={button.name}>
                            {button.name}
                        </MenuItem>
                    ))}
                </Select>

                <TextField
                    required
                    name="nameOfButton"
                    label="Name of Button"
                    fullWidth
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    required
                    name="actionOfButton"
                    label="Action of Button"
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

export default EditButton;