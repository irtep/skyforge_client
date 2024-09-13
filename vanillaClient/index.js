import {
  saveTrigger,
  loadTriggers,
  removeTrigger,
  getTrigger,
  triggerit
} from './functions/triggerManager.js';

import {
  addButton,
  fetchButtonsToHtml,
  addButtonsToButtonsModal,
  selectButtonToEdit,
  deleteSelectedButton
} from './functions/buttonManager.js';

import {
  indexValue,
  historyList,
  KeyDown
} from './functions/commandHistory.js';

export const socket = io();

/***************************
 *  Trigger editor and Button editor:
 ***************************/

// command buttons, that are user made buttons to send commands commands to game
const commandButtons = document.getElementsByClassName('commandButtons');

// combobox triggerlist
const comboboxTriggerList = document.getElementById("TriggerList");

// Get the modals
const triggerModal = document.getElementById("TriggerEditorModal"); // trigger editor
const buttonModal = document.getElementById("buttonEditorModal"); // button editor

// Get the button that opens the modal
const btnOpenTriggerEditor = document.getElementById("OpenTriggerEditorBtn"); // trigger editor
const btnEditorOpener = document.getElementById("buttonEditorOpener"); // buttons editor

// Get the <span> element that closes the modal
const spanCloseTriggerEditor = document.getElementsByClassName("closeTriggerEditor")[0];
const btnEditorCloseSpan = document.getElementsByClassName("closeButtonEditor")[0];

// When the user clicks on the button, open the modal
btnOpenTriggerEditor.onclick = function () { // trigger editor
  triggerModal.style.display = "block";  
}
// load triggers eventlistener
btnOpenTriggerEditor.addEventListener("click", loadTriggers);
// get trigger eventlistener
comboboxTriggerList.addEventListener("change", getTrigger);

// When the user clicks on the button, open the modal
btnEditorOpener.onclick = function () { // buttons editor
  buttonModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
spanCloseTriggerEditor.onclick = function () { // trigger editor
  triggerModal.style.display = "none";
}
btnEditorCloseSpan.onclick = function () { // buttons editor
  buttonModal.style.display = "none";
}

/***************************
 *  Commandline:
 ***************************/
// Command line
const commandLine = document.getElementById("cLine");

/***************************
 *  Event listeners:
 ***************************/

// event listener for command buttons
for (var i = 0; i < commandButtons.length; i++) {
  commandButtons[i].addEventListener('click', sendButtonMessage, false);
}

// event listener for enter:
document.getElementById('cLine').addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
    sendMessage();
    KeyDown("EnterKey", commandLine.value);
  }
  if (e.keyCode === 38) {  //checks whether the pressed key is "UpArrow"
    KeyDown("KeyUp", null);
    commandLine.value = historyList[indexValue];
    commandLine.select();
  }
  if (e.keyCode === 40) {  //checks whether the pressed key is "DownArrow"
    KeyDown("KeyDown", null);
    commandLine.value = historyList[indexValue];
    commandLine.select();
  }
});

// event listener if in button list modal something changes
document.getElementById('buttonList').addEventListener('change', function (e) {
  selectButtonToEdit(e);
});

// event listener for save trigger button
document.getElementById('SaveTrigger').addEventListener("click", saveTrigger);

// event listener for remove trigger button
document.getElementById('RemoveTrigger').addEventListener("click", removeTrigger);

// event listener for save a new button
document.getElementById('saveButton').addEventListener("click", addButton);

// event listener for remove selected button
document.getElementById('removeSelectedButton').addEventListener("click", deleteSelectedButton);


/***************************
 *  Communication between client and server:
 ***************************/

// send message to server
function sendMessage() {
  const data = document.getElementById('cLine').value;
  socket.emit('command', data);
  document.getElementById('cLine').select();
}

// Receive messages from server:
socket.on('message', (message) => {
  
  const command = message.command;
  const data = message.data;
  const messut = document.getElementById('mudScreen');

  messut.innerHTML = messut.innerHTML += `${data}`;

  // match triggers
  if (triggerit.length > 0) {

    triggerit.forEach( trig => {
      const checkThis = data.includes(trig.pattern);
      if (checkThis) {
        socket.emit('command', trig.action);
      }
    });
  }

  // remove extra lines
  var rivit = messut.innerHTML.split('\n');
  var maara = rivit.length - 250;
  //console.log('Maara: %d', maara);
  if (maara > 0) {
    for (var loop = 0; loop < maara; loop++) {
      rivit.shift();
    }
    messut.innerHTML = rivit.join('\n');
  }

  // scrolling to down
  messut.scrollTop = messut.scrollHeight;

});

/***************************
 *  When application starts:
 ***************************/

window.onload = (() => {

  // focus on command line:
  document.getElementById('cLine').focus();

  // fetch saved buttons from localStorage and make those to html
  // creates saved buttons
  fetchButtonsToHtml();

  // adds saved buttons to button editor modal
  addButtonsToButtonsModal();

  // load triggers
  loadTriggers();

});