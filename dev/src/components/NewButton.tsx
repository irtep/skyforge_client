import { Button, Dialog, DialogTitle, Stack, TextField } from '@mui/material';
import React, { Dispatch, SetStateAction, useRef } from 'react';

interface ButtonItem {
    name: string;
    action: string;
}

interface NewButtonProps {
    newButtonDialogOpen: boolean;
    setNewButtonDialogOpen: Dispatch<SetStateAction<boolean>>;
    savedButtons: ButtonItem[];
    setSavedButtons: Dispatch<SetStateAction<ButtonItem[]>>;
}

const NewButton: React.FC<NewButtonProps> = (props: NewButtonProps): React.ReactElement => {
    const formRef = useRef<HTMLFormElement>(null);

    const save = (e: React.FormEvent): void => {
        e.preventDefault();

        let buttons: ButtonItem[] = [];

        const storedButtons = localStorage.getItem("buttons");

        if (storedButtons) {
            buttons = JSON.parse(storedButtons);
        }

        buttons = [
            ...buttons,
            {
                name: formRef.current?.nameOfButton.value,
                action: formRef.current?.actionOfButton.value
            }
        ];

        localStorage.setItem("buttons", JSON.stringify(buttons));
        props.setSavedButtons(buttons);
        props.setNewButtonDialogOpen(false);
    };

    const cancelSend = (): void => {
        props.setNewButtonDialogOpen(false);
    };

    return (
        <Dialog
            maxWidth="lg"
            fullWidth={true}
            open={props.newButtonDialogOpen}
            onClose={cancelSend}
        >
            <DialogTitle>Create a Button</DialogTitle>
            <Stack
                spacing={1}
                component="form"
                onSubmit={save}
                ref={formRef}
            >
                <TextField
                    required
                    name="nameOfButton"
                    label="Name of Button"
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    required
                    name="actionOfButton"
                    label="Action of Button"
                    fullWidth
                    variant="outlined"
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

export default NewButton;