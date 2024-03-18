import { triggerit } from '../index.js';

const listbox = document.getElementById("TriggerList");
const namefield = document.getElementById("TriggerName");
const patternfield = document.getElementById("TriggerPattern");
const actionfield = document.getElementById("TriggerAction");

export function addTrigger() {
    console.log('Funktion addtrigger kutsu...');
    // check if name field is empty
    if (namefield.value !== "" && patternfield.value !== "" && actionfield.value !== "") {
        console.log('Name/Pattern/Action kentat EIVAT ole tyhjia... jatketaan...');
        triggerit.push({name: namefield.value, pattern: patternfield.value, action: actionfield.value});
        console.log('Triggeri array: ', triggerit);
    }
    else {
        window.alert("Name/Pattern/Action fields cannot be empty!");
    }
}