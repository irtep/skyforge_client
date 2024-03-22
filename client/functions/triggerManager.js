const listbox = document.getElementById("TriggerList");
const namefield = document.getElementById("TriggerName");
const patternfield = document.getElementById("TriggerPattern");
const actionfield = document.getElementById("TriggerAction");

var triggerit = [];

export function addTrigger() {
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
      // add 'create new trigger' option
      var optioni = document.createElement("option");
      optioni.value = "Create New Trigger";
      optioni.innerHTML = "Create New Trigger";
      listbox.appendChild(optioni);
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
  }
  else {
    // show warning message IF textfields are empty
    window.alert("Name/Pattern/Action fields cannot be empty!");
  }
}

export function loadTriggers() {
  // check if any triggers exits
  if (localStorage.getItem("skyforge client triggers")) {
    // get triggers from storage
    var triggersFromStorage = JSON.parse(localStorage.getItem("skyforge client triggers"));
    // push each trigger into array
    triggersFromStorage.forEach( (tr) => {
      triggerit.push(tr);
    });
  }  
  // empty old triggerlist
  while (listbox.length > 0) {
    listbox.remove(0);
  }
  // add 'create new trigger' option
  var optioni = document.createElement("option");
  optioni.value = "Create New Trigger";
  optioni.innerHTML = "Create New Trigger";
  listbox.appendChild(optioni);
  // add trigger options from array
  for (var i = 0; i < triggerit.length; i++) {
    var optionit = document.createElement("option");
    optionit.value = triggerit[i].name;
    optionit.innerHTML = triggerit[i].name;
    listbox.appendChild(optionit);
  }
}

export function removeTrigger() {
  // if selectedindex GREATER than zero
  if (listbox.selectedIndex > 0) {
    // take index from listbox and reduce by 1
    const indexi = listbox.selectedIndex - 1;
    triggerit.splice(indexi, 1);
    // update storage
    localStorage.setItem("skyforge client triggers", JSON.stringify(triggerit));
    // empty old triggerlist
    while (listbox.length > 0) {
      listbox.remove(0);
    }
    // add 'create new trigger' option
    var optioni = document.createElement("option");
    optioni.value = "Create New Trigger";
    optioni.innerHTML = "Create New Trigger";
    listbox.appendChild(optioni);
    // add trigger options from array
    for (var i = 0; i < triggerit.length; i++) {
      var optionit = document.createElement("option");
      optionit.value = triggerit[i].name;
      optionit.innerHTML = triggerit[i].name;
      listbox.appendChild(optionit);
    }
    // empty textfields
    namefield.value = "";
    patternfield.value = "";
    actionfield.value = "";
  }
}

export function getTrigger() {
  // get trigger data from array when index > 0
  if (listbox.selectedIndex > 0) {
    const indexi = listbox.selectedIndex - 1;
    namefield.value = triggerit[indexi].name;
    patternfield.value = triggerit[indexi].pattern;
    actionfield.value = triggerit[indexi].action;
  }
  else {
    // empty textfields
    namefield.value = "";
    patternfield.value = "";
    actionfield.value = "";
  }
}