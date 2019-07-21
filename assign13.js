const performance_type = document.getElementById("performance");
const first_name = document.getElementById("first_name");
const last_name = document.getElementById("last_name");
const student_id = document.getElementById("student_id");
const first_name2 = document.getElementById("first_name2");
const last_name2 = document.getElementById("last_name2");
const student_id2 = document.getElementById("student_id2");
const skill = document.getElementById("skill");
const instrument = document.querySelectorAll(".instrument-type");
const practice_location = document.getElementById("location");
const room = document.getElementById("room");
const time_slot = document.getElementById("time_slot");
const file_output = document.getElementById("fileOutput");
const my_form = document.getElementById("my-form");

const registerButton = document.getElementById("register-button");
const clearButton = document.getElementById("clear-button");

inputs = [first_name, last_name, student_id, room, time_slot];
inputs_duet = [first_name2, student_id2, last_name2];

/******************************START validators**********************************/
function validateInput() {
    let wasIssue = false;
    let message = "";
    inputs.forEach(input => {
        if (input.value == "") {
            message = "must enter text";
            badInputHandler(input, message);
            wasIssue = true;
        }
        else {
            goodInputHandler(input);
        }
    });

    if (performance_type.value == "duet") {
        inputs.forEach(input => {
            if (input.value == "") {
                message = "must enter text";
                badInputHandler(input, message);
                wasIssue = true;
            }
            else {
                goodInputHandler(input);
            }
        });
    }

    if (performance_type.options[performance_type.selectedIndex].value == "") {
        message = "You must select a performance";
        badInputHandler(performance_type, message);
        wasIssue = true;
    } else {
        goodInputHandler(performance_type);
    }

    if (skill.options[skill.selectedIndex].value == "") {
        message = "You must select a performance";
        badInputHandler(skill, message);
        wasIssue = true;
    } else {
        goodInputHandler(skill);
    }

    if (document.querySelector('input[name="instrument"]').checked.value == null) {
    } else {
    }

    if (practice_location.options[practice_location.selectedIndex].value == "") {
        message = "You must select a location";
        badInputHandler(practice_location, message);
        wasIssue = true;
    } else {
        goodInputHandler(practice_location);
    }

    if (wasIssue)
        return false;
    else 
        return true;
}

/******************************END validators**********************************/
/******************************START listeners**********************************/
my_form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateInput()) {
        let formData = new FormData(my_form);

        let apiAddress = `assign13.php`;
        fetch(apiAddress, {
            method: "POST",
            body: formData
        }).then(response => response.json()) //TODO: change this back to .json()
        .then(responseJson => {
            displayData(responseJson);
            //console.log(responseJson);
        }).catch(e => {
            //console.log("error: " + e);
        });
    }
});

clearButton.addEventListener("click", () => {
    inputs.forEach(element => {
        element.value = "";
    });
})

performance_type.addEventListener("change", () => {
    duet_div = document.getElementById("shown-for-duet");
    if (performance_type.value == "duet") {
        duet_div.style.display = "block"; 
    } else {
        duet_div.style.display = "none"; 
    }
})

/******************************END listeners**********************************/
/******************************START input handlers**********************************/

/* gives feedback to user for bad input, takes an element as input */
function badInputHandler(input, message) {
    input.style.borderColor = "red";

    // output error message
    if (message && input.previousElementSibling.tagName != "SMALL") {
        // create error message element
        let errorElement = document.createElement("small");
        let errorMessage = document.createTextNode(message);
        errorElement.appendChild(errorMessage);
        errorElement.style.color = "red";

        // insert error message after element
        input.parentNode.insertBefore(errorElement, input);
    }

    input.focus();
}

/* gives feedback to user for good input, takes an element as input */
function goodInputHandler(input) {
    if (input.previousElementSibling.tagName == "SMALL") {
        input.parentNode.removeChild(input.previousElementSibling);
    } 

    input.style.borderColor = "green";
}
/******************************END input handlers**********************************/
/******************************START ajax handlers**********************************/
/*
function runApiRequest() {
    const formData = new formData(my_form);

    let apiAddress = `assign13.php`;
    fetch(apiAddress, {
        method: "post",
        body: formData
    }).then(response => response.json())
        .then(responseJson => {
            console.log("worked");
            console.log(JSON.stringify(responseJson));
        })
}
*/
/******************************END ajax handlers**********************************/

function displayData(response_info) {
    let jsonString = JSON.parse(JSON.stringify(response_info));

    let output = "";

    jsonString.forEach(element => {
        console.log(element.first_name); 
        output += `
        <tr>
            <td>${element.first_name}</td>
            <td>${element.last_name}</td>
            <td>${element.student_id}</td>
            <td>${element.first_name2}</td>
            <td>${element.last_name2}</td>
            <td>${element.student_id2}</td>
            <td>${element.skill}</td>
            <td>${element.instrument}</td>
            <td>${element.location}</td>
            <td>${element.room}</td>
            <td>${element.time_slot}</td>
        </tr>
        `;
    });

    let baseHtml = `<div>
    <table>
        <tr>
            <th>first name</h>
            <th>last name</h>
            <th>student ID</h>
            <th>first name 2</h>
            <th>last name 2</h>
            <th>student id 2</h>
            <th>skill level</h>
            <th>instrument</h>
            <th>location</h>
            <th>room number</h>
            <th>time slot</h>
        </tr>   
        ${output}
    </table>
    </div>`;

    file_output.innerHTML = baseHtml;
}