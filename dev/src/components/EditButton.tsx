import { Button, Dialog, DialogTitle, MenuItem, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

interface ButtonItem {
    id: number;
    name: string;
    action: string;
}

interface EditButtonProps {
    editButtonDialogOpen: boolean;
    setEditButtonDialogOpen: Dispatch<SetStateAction<boolean>>;
    savedButtons: ButtonItem[];
    setSavedButtons: Dispatch<SetStateAction<ButtonItem[]>>;
}

const EditButton: React.FC<EditButtonProps> = ({
    editButtonDialogOpen,
    setEditButtonDialogOpen,
    savedButtons,
    setSavedButtons
}: EditButtonProps): React.ReactElement => {
    const [selectedButtonId, setSelectedButtonId] = useState<number | ''>('');
    const [name, setName] = useState<string>('');
    const [action, setAction] = useState<string>('');

    const formRef = useRef<HTMLFormElement>(null);

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const selectedId = event.target.value === '' ? '' : Number(event.target.value);
        setSelectedButtonId(selectedId);
        
        const foundButton = savedButtons.find(b => b.id === selectedId) || null;
        if (foundButton) {
            setName(foundButton.name);
            setAction(foundButton.action);
        } else {
            setName('');
            setAction('');
        }
    };

    const save = (e: React.FormEvent): void => {
        e.preventDefault();
        if (selectedButtonId === '') return;

        const updatedButtons = savedButtons.map(b => 
            b.id === selectedButtonId 
            ? { ...b, name, action }
            : b
        );

        localStorage.setItem("buttons", JSON.stringify(updatedButtons));
        setSavedButtons(updatedButtons);
        setEditButtonDialogOpen(false);
    };

    const cancelSend = (): void => {
        setEditButtonDialogOpen(false);
    };

    useEffect(() => {
        if (!editButtonDialogOpen) {
            setSelectedButtonId('');
            setName('');
            setAction('');
        }
    }, [editButtonDialogOpen]);

    return (
        <Dialog
            maxWidth="lg"
            fullWidth
            open={editButtonDialogOpen}
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
                    value={selectedButtonId === '' ? '' : String(selectedButtonId)}
                    onChange={(e) => handleSelectChange(e as SelectChangeEvent<string>)}
                    displayEmpty
                >
                    <MenuItem value="" disabled>Select a button</MenuItem>
                    {savedButtons.map((button: ButtonItem) => (
                        <MenuItem key={button.id} value={String(button.id)}>
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
