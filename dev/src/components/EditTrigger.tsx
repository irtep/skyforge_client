import { Button, Dialog, DialogTitle, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Trigger } from '../App';

interface EditTriggerProps {
    EditTriggerDialogOpen: boolean;
    setEditTriggerDialogOpen: Dispatch<SetStateAction<boolean>>;
    triggers: Trigger[];
    setTriggers: Dispatch<SetStateAction<Trigger[]>>;
}

const EditTrigger: React.FC<EditTriggerProps> = (props: EditTriggerProps): React.ReactElement => {
    const [selectedTrigger, setSelectedTrigger] = useState<Trigger>({
        name: '',
        pattern: '',
        action: ''
    });
    const [name, setName] = useState<string>('');
    const [pattern, setPattern] = useState<string>('');
    const [action, setAction] = useState<string>('');

    //const [errors, setErrors] = useState<Errors>({ name: '', pattern: '', action: '' });

    const formRef: any = useRef<HTMLFormElement>();

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        console.log('value: ', event.target.value);
        //const selectedId = parseInt(event.target.value, 10);
        const foundTrigger = props.triggers.find(t => t.name === event.target.value) || null;
        //setSelectedTrigger(trigger);
        console.log('found trig: ', foundTrigger);
      };

    const save = (e: React.FormEvent): void => {
        e.preventDefault();
        //console.log('click', formRef.current.nameOfTrigger);

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

        props.setEditTriggerDialogOpen(false);

    }

    useEffect(() => {
        // fill the select
    }, [props.triggers]);

    return (
        <Dialog
            maxWidth="lg"
            fullWidth={true}
            open={props.EditTriggerDialogOpen}
            onClose={cancelSend}
        >

            <DialogTitle>create a trigger</DialogTitle>

            <Stack
                spacing={1}
                component="form"
                onSubmit={save}
                ref={formRef}
            >
                <Select onChange={handleSelectChange}>
                    {props.triggers.map((trigger: Trigger, i: number) => (
                        <option key={i} value={trigger.name}>
                            {trigger.name}
                        </option>
                    ))}

                </Select>

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

export default EditTrigger;