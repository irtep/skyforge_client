"use strict";
const socket = io();
const commandButtons = document.getElementsByClassName('commandButtons');

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myOpenBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

function addTrigger() {
  var selectList = document.getElementById("myList");
  var newName = document.getElementById("myName").value;
  if (newName != "") {
    var newOption = document.createElement("option");
    newOption.value = newName;
    newOption.innerHTML = newName;
    selectList.appendChild(newOption);
  }
  else {
    window.alert("Name field cannot be empty!");
  }
}

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

// send message to server by buttons
function sendButtonMessage(clickedButton) {
  console.log('value= ', clickedButton.target.value);
  const data = clickedButton.target.value;
  socket.emit('command', data);
  document.getElementById('cLine').select();
}

// send message to server
function sendMessage(){
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
  console.log('Maara: %d', maara);
  if (maara > 0){
    for (var loop = 0; loop < maara; loop++){
      rivit.shift();      
    }
    messut.innerHTML = rivit.join('\n');
  }
  
  // scrolling to down
  messut.scrollTop = messut.scrollHeight;

});
window.onload = ( () => {
  // focus on command line:
  document.getElementById('cLine').focus();
});