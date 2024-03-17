import {
  addTrigger
} from './functions/triggerManager.js';

import {
  addButton,
  fetchButtonsToHtml,
  addButtonsToButtonsModal,
  selectButtonToEdit
} from './functions/buttonManager.js';

export const socket = io();

/***************************
 *  Trigger editor and Button editor:
 ***************************/

// command buttons, that are user made buttons to send commands commands to game
const commandButtons = document.getElementsByClassName('commandButtons');

// Get the modals
var modal = document.getElementById("myModal"); // trigger editor
const buttonModal = document.getElementById("buttonEditorModal"); // button editor

// Get the button that opens the modal
var btn = document.getElementById("myOpenBtn"); // trigger editor
const btnEditorOpener = document.getElementById("buttonEditorOpener"); // buttons editor

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
const btnEditorCloseSpan = document.getElementsByClassName("closeButtonEditor")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () { // trigger editor
  modal.style.display = "block";
}
btnEditorOpener.onclick = function () { // buttons editor
  buttonModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () { // trigger editor
  modal.style.display = "none";
}
btnEditorCloseSpan.onclick = function () { // buttons editor
  buttonModal.style.display = "none";
}

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
  }
});

// event listener if in button list modal something changes
document.getElementById('buttonList').addEventListener('change', function (e) {
  selectButtonToEdit(e);
});

// event listener for save trigger button
document.getElementById('saveTrigger').addEventListener("click", addTrigger);

// event listener for button button
document.getElementById('saveButton').addEventListener("click", addButton);


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

});