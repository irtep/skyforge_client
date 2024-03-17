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