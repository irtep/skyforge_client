import { triggerit } from '../index.js';

const listbox = document.getElementById("TriggerList");
const namefield = document.getElementById("TriggerName");
const patternfield = document.getElementById("TriggerPattern");
const actionfield = document.getElementById("TriggerAction");

export function addTrigger() {
  console.log('Funktion addtrigger kutsu...');
  var found = false;
  // check if name/pattern/action fields NOT empty
  if (namefield.value !== "" && patternfield.value !== "" && actionfield.value !== "") {
    // check if name exits
    for (var i = 0; i < triggerit.length; i++) {
      if (triggerit[i].name.toLowerCase() === namefield.value.toLowerCase()) {
        found = true;
      }
    }
    // create new trigger IF "Create New Trigger" IS selected
    if (listbox.selectedIndex === 0 && found == false) {
      // add trigger into array
      triggerit.push({name: namefield.value, pattern: patternfield.value, action: actionfield.value});
      // update storage
      localStorage.setItem("skyforge client triggers", JSON.stringify(triggerit));
      // empty textfields
      namefield.value = "";
      patternfield.value = "";
      actionfield.value = "";
      // empty listbox
      while (listbox.length > 0) {
        listbox.remove(0);
      }
      // add updated array into listbox
      for (var i = 0; i < triggerit.length; i++) {
        var optionit = document.createElement("option");
        optionit.value = triggerit[i].name;
        optionit.innerHTML = triggerit[i].name;
        listbox.appendChild(optionit);
      }
    }
    else if (listbox.selectedIndex === 0 && found == true) {
      // show warning message IF name exits already
      window.alert("Name '" + namefield.value + "' already exits!");
    }
    console.log('Triggeri array:', triggerit);
  }
  else {
    // show warning message IF textfields are empty
    window.alert("Name/Pattern/Action fields cannot be empty!");
  }
}

export function loadTriggers() {
  // push to 1st "create new trigger"
  if (triggerit.length == 0) {
    console.log('Luotu create new trigger...');
    triggerit.push({name: "Creater New Trigger", pattern: "", action: ""});
  }  
  // check if any triggers exits
  if (localStorage.getItem("skyforge client triggers")) {
    // get triggers from storage
    console.log('Triggereita loytyi...');
    triggerit = JSON.parse(localStorage.getItem("skyforge client triggers"));
  }  
  // update triggerlist
  var triggerilista = document.getElementById("TriggerList");
  var optionit = null;
  while (triggerilista.length > 0) {
    triggerilista.remove(0);
  }
  for (var i = 0; i < triggerit.length; i++) {
    optionit = document.createElement("option");
    optionit.value = triggerit[i].name;
    optionit.innerHTML = triggerit[i].name;
    triggerilista.appendChild(optionit);
  }
}