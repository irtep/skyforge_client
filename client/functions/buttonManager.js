import { socket } from '../index.js';
const actionButtonsSection = document.getElementById("actionButtons");
const selectList = document.getElementById("buttonList");

// save buttons
export const saveNewButton = (newButton) => {
    // fetch all
    let buttons = [];

    if (localStorage.getItem("buttons")) {
        // If it exists, parse the JSON data into an array
        buttons = JSON.parse(localStorage.getItem("buttons"));
    }

    // check if one with this name already exists
    const filtered = buttons.filter((b) => b.name === newButton.name);

    // if yes, replace it
    if (filtered.length > 0) {
        buttons = buttons.map((b) => {
            if (b.name === newButton.name) {
                return newButton;
            } else {
                return b;
            }
        });
        // if no, create new
    } else {
        buttons = [
            ...buttons,
            newButton
        ];
    }

    // Save the updated array back to localStorage
    localStorage.setItem("buttons", JSON.stringify(buttons));
}

// send message to server by buttons
export const sendButtonMessage = (clickedButton) => {
    
    //const data = clickedButton.target.value;
    socket.emit('command', clickedButton);
    document.getElementById('cLine').select();
}

export const fetchButtonsToHtml = () => {
    let buttons = [];

    if (localStorage.getItem("buttons")) {
        // If it exists, parse the JSON data into an array
        buttons = JSON.parse(localStorage.getItem("buttons"));
    }

    // Loop through the buttons
    buttons.forEach(function (button) {

        // Create a button element
        var newButton = document.createElement("button");
        newButton.classList.add("commandButtons");
        newButton.id = button.name;
        newButton.value = button.action;
        newButton.innerHTML = button.action;

        // Attach event listener to call the function "sendCommand" when clicked
        newButton.addEventListener("click", (e) => {
            sendButtonMessage(e.target.value)
        });

        // Append the button to the "actionButtons" section
        actionButtonsSection.appendChild(newButton);
    });

};

export const selectButtonToEdit = (e) => {

    let nameInput = document.getElementById("nameOfButton");
    let actionInput = document.getElementById("actionOfButton");
    // get buttons from localStorage
    const buttons = JSON.parse(localStorage.getItem("buttons"));
    const selectedButton = buttons.filter((b) => b.name === e.target.value);
    console.log('selected: ', selectedButton[0]);

    nameInput.value = selectedButton[0].name;
    actionInput.value = selectedButton[0].action;

}

export const addButtonsToButtonsModal = () => {
    let buttons = [];

    // fill from localstorage, if any
    if (localStorage.getItem("buttons")) {
        // If it exists, parse the JSON data into an array
        buttons = JSON.parse(localStorage.getItem("buttons"));
    }

    if (buttons.length > 0) {

        buttons.forEach((btn) => {

            // add to list
            let newOption = document.createElement("option");
            newOption.value = btn.name;
            newOption.innerHTML = btn.name;
            selectList.appendChild(newOption);

        });

    };
};

// adds or edits button
export const addButton = () => {

    const newName = document.getElementById("nameOfButton").value;
    const newAction = document.getElementById("actionOfButton").value;
    const newButton = { name: newName, action: newAction };
    let buttons = [];

    // fill from localstorage, if any
    if (localStorage.getItem("buttons")) {
        // If it exists, parse the JSON data into an array
        buttons = JSON.parse(localStorage.getItem("buttons"));
    }

    // Clear the existing buttons
    actionButtonsSection.innerHTML = "";

    if (newName !== "" && newAction !== "") {

        // check if one with this name already exists
        const filtered = buttons.filter((b) => b.name === newName);

        // if yes, replace it
        if (filtered.length > 0) {
            buttons = buttons.map((b) => {
                if (b.name === newButton.name) {
                    return newButton;
                } else {
                    return b;
                }
            });

            // if no, create new
        } else {
            buttons = [
                ...buttons,
                newButton
            ];

            // add to list
            let newOption = document.createElement("option");
            newOption.value = newName;
            newOption.innerHTML = newName;
            selectList.appendChild(newOption);
        }

        // Save the updated array back to localStorage
        localStorage.setItem("buttons", JSON.stringify(buttons));/////





        // Push the new button object into the array
        //buttons.push({ name: newName, action: newAction });

        // Save the updated array back to localStorage
        localStorage.setItem("buttons", JSON.stringify(buttons));
        
        // refresh to html
        fetchButtonsToHtml();

    }

    else {
        window.alert("Name field cannot be empty!");
    }

}