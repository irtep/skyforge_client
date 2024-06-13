import { Button, Container, Dialog, DialogTitle, Select, TextField } from '@mui/material';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Trigger } from '../App';

interface NewTriggerProps {
    triggerDialogOpen: boolean;
    setTriggerDialogOpen: Dispatch<SetStateAction<boolean>>;
    triggers: Trigger[];
    setTriggers: Dispatch<SetStateAction<Trigger[]>>;
}

interface Errors {
    name: string
    pattern: string
    action: string
}

const NewTrigger: React.FC<NewTriggerProps> = (props: NewTriggerProps): React.ReactElement => {

    const [errors, setErrors] = useState<Errors>({ name: '', pattern: '', action: '' });

    const formRef: any = useRef<HTMLFormElement>();

    const saveNewTrigger = () => {
        // fetch all
        let triggers: Trigger[] = [];

        const storedTriggers = localStorage.getItem("triggers");

        if (storedTriggers) {
            // If it exists, parse the JSON data into an array
            triggers = JSON.parse(storedTriggers);
        }

        // check if one with this name already exists
        const filtered = triggers.filter((t: any) => t.name === String(formRef.current?.nameOfTrigger.value));

        // if yes, replace it
        if (filtered.length > 0) {
            triggers = triggers.map((t: any) => {
                if (t.name === formRef.current?.nameOfTrigger.value) {
                    return {
                        name: formRef.current?.nameOfTrigger.value,
                        pattern: formRef.current?.patternOfTrigger.value,
                        action: formRef.current?.actionOfTrigger.value
                    };
                } else {
                    return t;
                }
            });
            // if no, create new
        } else {
            triggers = [
                ...triggers,
                {
                    name: formRef.current?.nameOfTrigger.value,
                    pattern: formRef.current?.patternOfTrigger.value,
                    action: formRef.current?.actionOfTrigger.value
                }
            ];
        }

        // Save the updated array back to localStorage
        localStorage.setItem("triggers", JSON.stringify(triggers));
        props.setTriggers(triggers);
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
            ref={formRef}
            onSubmit={saveNewTrigger}
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