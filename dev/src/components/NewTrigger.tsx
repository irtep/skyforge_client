import { Button, Container, Dialog, DialogTitle, Select, TextField } from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';

interface NewTriggerProps {
    triggerDialogOpen: boolean;
    setTriggerDialogOpen: Dispatch<SetStateAction<boolean>>;
}

interface Errors {
    name: string
    pattern: string
    action: string
}

const NewTrigger: React.FC<NewTriggerProps> = (props: NewTriggerProps): React.ReactElement => {

    const [errors, setErrors] = useState<Errors>({ name: '', pattern: '', action: '' });

    const saveNewTrigger = (NewTrigger: any) => {
        // fetch all
        let triggers: string[] = [];

        if (localStorage.getItem("triggers")) {
            // If it exists, parse the JSON data into an array
            triggers = JSON.parse(localStorage.getItem("triggers"));
        }

        // check if one with this name already exists
        const filtered = triggers.filter((t) => t.name === newTrigger.name);

        // if yes, replace it
        if (filtered.length > 0) {
            triggers = triggers.map((t) => {
                if (t.name === newTrigger.name) {
                    return newTrigger;
                } else {
                    return t;
                }
            });
            // if no, create new
        } else {
            triggers = [
                ...triggers,
                newTrigger
            ];
        }

        // Save the updated array back to localStorage
        localStorage.setItem("triggers", JSON.stringify(triggers));
    }

    const cancelSend = (): void => {

        props.setTriggerDialogOpen(false);

    }

    return (
        <Dialog
            maxWidth="lg"
            fullWidth={true}
            open={props.triggerDialogOpen}
            onClose={cancelSend}
        >

            <DialogTitle>create or edit trigger</DialogTitle>

            <Select></Select>

            <TextField
                required
                name="nameOfTrigger"
                label="name of trigger"
                fullWidth
                variant="outlined"
                helperText={errors.name}
            />
            <TextField
                required
                name="patternOfTrigger"
                label="pattern of trigger"
                fullWidth
                variant="outlined"
                helperText={errors.pattern}
            />
            <TextField
                required
                name="actionOfTrigger"
                label="action of trigger"
                fullWidth
                variant="outlined"
                helperText={errors.action}
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

        </Dialog>
    );
};

export default NewTrigger;