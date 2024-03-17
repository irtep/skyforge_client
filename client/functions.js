export function addTrigger() {
    console.log('addtrigger');
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
