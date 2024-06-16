import { Button, Dialog, DialogTitle, Stack, TextField } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Trigger } from '../App';

interface NewTriggerProps {
    newTriggerDialogOpen: boolean;
    setNewTriggerDialogOpen: Dispatch<SetStateAction<boolean>>;
    triggers: Trigger[];
    setTriggers: Dispatch<SetStateAction<Trigger[]>>;
}

const NewTrigger: React.FC<NewTriggerProps> = (props: NewTriggerProps): React.ReactElement => {

    const formRef: any = useRef<HTMLFormElement>();

    const save = (e: React.FormEvent): void => {
        e.preventDefault();

        let triggers: Trigger[] = [];

        const storedTriggers = localStorage.getItem("triggers");

        if (storedTriggers) {
            // If it exists, parse the JSON data into an array
            triggers = JSON.parse(storedTriggers);
        }

        // check if one with this name already exists
        //const filtered = triggers.filter((t: any) => t.name === String(formRef.current?.nameOfTrigger.value));

        triggers = [
            ...triggers,
            {
                name: formRef.current?.nameOfTrigger.value,
                pattern: formRef.current?.patternOfTrigger.value,
                action: formRef.current?.actionOfTrigger.value
            }
        ];

        // Save the updated array back to localStorage
        localStorage.setItem("triggers", JSON.stringify(triggers));
        props.setTriggers(triggers);
        props.setNewTriggerDialogOpen(false);
    }

    const cancelSend = (): void => {

        props.setNewTriggerDialogOpen(false);

    }

    useEffect(() => {
        // fill the select
    }, [props.triggers]);

    return (
        <Dialog
            maxWidth="lg"
            fullWidth={true}
            open={props.newTriggerDialogOpen}
            onClose={cancelSend}
        >

            <DialogTitle>create a trigger</DialogTitle>

            <Stack
                spacing={1}
                component="form"
                onSubmit={save}
                ref={formRef}
            >

                <TextField
                    required
                    name="nameOfTrigger"
                    label="name of trigger"
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    required
                    name="patternOfTrigger"
                    label="pattern of trigger"
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    required
                    name="actionOfTrigger"
                    label="action of trigger"
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

export default NewTrigger;