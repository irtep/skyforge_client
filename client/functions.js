export function addTrigger() {
    console.log('addtrigger');
    var indexi = -1;
    var selectList = document.getElementById("myList");  
    var newName = document.getElementById("myName").value;
    for (var i = 0; i < selectList.length; i++) {
        if (selectList.options[i].value == newName) {
        indexi = i;
        }
    }
    // if name field is NOT empty do stuff, else show warning message
    if (newName != "") {
        // if name not found in list THEN create new one
        if (indexi == -1) {
        var newOption = document.createElement("option");
        newOption.value = newName;
        newOption.innerHTML = newName;
        selectList.appendChild(newOption);
        } // if name exits and is selected THEN save changes
        else if (selectList.selectedIndex == indexi) {
            console.log('tallennus proseduuri koodi');
        }
        // if name exits and is not selected THEN show warning message
        else if (selectList.selectedIndex != indexi && indexi > -1) {
            window.alert("Name already exits!");
        }
    }
    else {
        window.alert("Name field cannot be empty!");
    }
}

// send message to server by buttons
export const sendButtonMessage = (clickedButton) => {
    console.log('value= ', clickedButton.target.value);
    const data = clickedButton.target.value;
    socket.emit('command', data);
    document.getElementById('cLine').select();
  }

export const addButton = () => {

    console.log('addbutton');
    let selectList = document.getElementById("buttonList");
    const newName = document.getElementById("nameOfButton").value;
    const newAction = document.getElementById("actionOfButton").value;
    let buttons = [];
    const actionButtonsSection = document.getElementById("actionButtons");

    // Clear the existing buttons
    actionButtonsSection.innerHTML = "";

    if (newName !== "") {

        // add to list
        let newOption = document.createElement("option");
        newOption.value = newName;
        newOption.innerHTML = newName;
        selectList.appendChild(newOption);

        // add to local storage
        // Check if "buttons" exists in localStorage
        if (localStorage.getItem("buttons")) {
            // If it exists, parse the JSON data into an array
            buttons = JSON.parse(localStorage.getItem("buttons"));
        }

        // Push the new button object into the array
        buttons.push({ name: newName, action: newAction });

        // Save the updated array back to localStorage
        localStorage.setItem("buttons", JSON.stringify(buttons));

        // Loop through the buttons
        buttons.forEach(function (button) {
            // Create a button element
            var newButton = document.createElement("button");
            // Add class "commandButtons" to the button
            newButton.classList.add("commandButtons");
            // Set the id of the button
            newButton.id = button.name;
            // Set the value of the button
            newButton.innerHTML = button.action;

            // Attach event listener to call the function "sendCommand" when clicked
            newButton.addEventListener("click", (e) => {
                sendButtonMessage(e.target.value)
            });

            // Append the button to the "actionButtons" section
            actionButtonsSection.appendChild(newButton);
        });
    }

    else {
        window.alert("Name field cannot be empty!");
    }

}
