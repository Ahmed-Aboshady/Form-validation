//catch save button
var addButton = document.getElementById("addBtn");
//catch clear button
var clearButton = document.getElementById("clearBtn");
//catch print button
var printButton = document.getElementById("printBtn");
//two arrays one to hold old values from the table and the other to hold  persons objects 
var oldValues = [],
    personsArray = [];
//constructor function to creat person object
function person(name, email, age) {
    this.name = name,
        this.email = email,
        this.age = age;
}

// variables to check on validations
var isNameValid = false,
    isAgeValid = false,
    isEmailValid = false,
    isGenderChecked = false,
    isPasswordValid = false,
    selectedGender = "",
    isCountrySelected = false,
    selectedCountry = "",
    genderArray = [],
    pass = '',
    interestsArray = [];

//validations down here
//validate Gender
document.getElementsByName('gender')[0].onchange = function() {
    document.getElementById('genderValidator').innerHTML = "";
    isGenderChecked = true;
    selectedGender = "male";
}
document.getElementsByName('gender')[1].onchange = function() {
    document.getElementById('genderValidator').innerHTML = "";
    isGenderChecked = true;
    selectedGender = "female";
}

//validate email
document.getElementById("email").onblur = validateEmail;

function validateEmail() {

    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailRegex.test(document.getElementById("email").value)) {
        isEmailValid = true;
        document.getElementById('emailValidator').innerHTML = "";
    } else {
        document.getElementById('emailValidator').innerHTML = "Try Again";
        isEmailValid = false;
    }
}
//validate username
document.getElementById("userName").onblur = validateName;

function validateName() {
    // inputName = document.getElementById("userName").value;
    var nameRegex = /^([a-zA-Z]){8,}$/;
    if (nameRegex.test(document.getElementById("userName").value)) {
        isNameValid = true;
        document.getElementById("nameValidator").innerHTML = "";
    } else {
        document.getElementById("nameValidator").innerHTML = "Try again";
        isNameValid = false;
    }
}
//validate age
document.getElementById("age").onblur = validateAge;

function validateAge() {
    var inputAge = document.getElementById("age").value;
    if (inputAge != null && 18 < inputAge && inputAge < 60 && isNaN(inputAge) == false) {
        isAgeValid = true;
        document.getElementById("AgeValidator").innerHTML = "";
    } else {
        document.getElementById("AgeValidator").innerHTML = "Try Again";
        isAgeValid = false;
    }

}
//validate password
document.getElementById('password').onblur = validatePassword;

function validatePassword() {
    pass = document.getElementById('password').value;
    if (pass != null && pass.length > 8) {
        isPasswordValid = true;
        document.getElementById('passwordValidator').innerHTML = " ";
    } else {
        isPasswordValid = false;
        document.getElementById('passwordValidator').innerHTML = "Try Again";
    }
}

//validate country
document.getElementById('dropDown').onchange = function() {
    document.getElementById('countryValidator').innerHTML = " ";
    isCountrySelected = true;
    var index = document.getElementById('dropDown').selectedIndex;
    selectedCountry = document.getElementById('dropDown')[index].value;
}

//check if add button is clicked
addButton.onclick = function() {

    if (isNameValid == true && isEmailValid == true && isPasswordValid == true && isAgeValid == true && isCountrySelected == true && isGenderChecked == true) {
        //interests
        for (var y = 0; y < document.getElementsByName('interests').length; y++) {

            if (document.getElementsByName('interests')[y].checked) {
                interestsArray[y] = document.getElementsByName('interests')[y].value;
            } else {
                interestsArray[y] = " ";
            }
        }
        //check if table is created before 
        if (!document.getElementById('myTable')) {
            var tbl = document.createElement('table');
            tbl.setAttribute('id', 'myTable');
            tbl.setAttribute('class', 'table-style');
            document.getElementById('table').appendChild(tbl);
            tbl.innerHTML = "<tr><th>Name</th><th>Email</th><th>Password</th><th>Age</th><th>Gender</th><th>Interests</th><th>Country</th><th>Update</th><th>Delete</th></tr>";
            tbl.innerHTML += "<tr><td align='center'>" + document.getElementById("userName").value + "</td><td align='center'>" + document.getElementById("email").value + "</td><td align='center'>" + '' + "</td><td align='center'>" + document.getElementById("age").value + "</td><td align='center'>" + selectedGender + "</td><td align='center'>" + interestsArray + "</td><td align='center'>" + selectedCountry + "</td><td align='center' ><button type = 'button' value = 'Update' class = 'button updateBtn' >Update</button></td><td align='center'><button type = 'button' value = 'delete' class = 'button deleteBtn' >Delete</button></td></tr>";
            personsArray.push(new person(document.getElementById("userName").value, document.getElementById("email").value, document.getElementById("age").value));
        } else {
            document.getElementById('myTable').innerHTML += "<tr><td align='center'>" + document.getElementById("userName").value + "</td><td align='center'>" + document.getElementById("email").value + "</td><td align='center'>" + '' + "</td><td align='center'>" + document.getElementById("age").value + "</td><td align='center'>" + selectedGender + "</td><td align='center'>" + interestsArray + "</td><td align='center'>" + selectedCountry + "</td><td align='center'><button type = 'button' value = 'Update' class = 'button updateBtn'  >Update</button></td><td align='center'><button type = 'button' value = 'delete' class = 'button deleteBtn' >Delete</button></td></tr>";
            personsArray.push(new person(document.getElementById("userName").value, document.getElementById("email").value, document.getElementById("age").value));
        }

        //call update function
        update();

        //delete button
        for (var i = 0; i < document.getElementsByClassName('deleteBtn').length; i++) {
            document.getElementsByClassName('deleteBtn')[i].onclick = function() {
                var rIndex = this.parentElement.parentElement.rowIndex;
                personsArray.splice(rIndex, 1);
                document.getElementById('myTable').removeChild(this.parentElement.parentElement.parentElement);
                document.getElementById('printtbl').removeChild(document.getElementById('printtbl').children[rIndex]);

            }
        }
    }
}

function update() {
    for (var j = 0; j < document.getElementsByClassName('updateBtn').length; j++) {
        document.getElementsByClassName('updateBtn')[j].onclick = function() {
            //get old values 
            for (var z = 0; z < 7; z++) {
                oldValues[z] = this.parentElement.parentElement.children[z].innerText;
            }
            oldValues[2] = pass;
            //name text box
            this.parentElement.parentElement.children[0].innerHTML = "<input type = 'text' id = 'nameNewValue' value = " + oldValues[0] + ">";
            //email textbox
            this.parentElement.parentElement.children[1].innerHTML = "<input type = 'text' id = 'emailNewValue' value = " + oldValues[1] + ">";
            //password text box
            this.parentElement.parentElement.children[2].innerHTML = "<input type = 'password' id = 'passwordNewValue' value = " + oldValues[2] + ">";
            //age text box
            this.parentElement.parentElement.children[3].innerHTML = "<input type = 'text' id = 'ageNewValue' value = " + oldValues[3] + ">";
            //gender radio buttons
            this.parentElement.parentElement.children[4].innerHTML = "<span>Male</span><input type='radio' name = 'gender' value='male1' id = 'male1'><span>Female</span><input type='radio' name='gender' value='female1' id = 'female1'>";
            //interests
            this.parentElement.parentElement.children[5].innerHTML = '<label>Swimming<input type="checkbox" id="swimming" name="interests1" value="Swimming"></label><label>Football<input type="checkbox" id="football" name="interests1" value="football"></label><label>Reading<input type="checkbox" id="reading" name="interests1" value="Reading"><label>Travelling<input type="checkbox" id="travelling" name="interests1" value="Travelling"></label>';
            //country
            this.parentElement.parentElement.children[6].innerHTML = '<select id="newDropDown" name="country" class="dropDown"><option disabled selected>Select your Country</option><option value="Egypt">Egypt</option><option value="France">France</option><option value="Spain">Spain</option><option value="England">England</option></select>';

            this.parentElement.innerHTML = "<button type = 'button' class = 'button saveUpdates'>save</button><button type = 'button' class = 'cancel button'>cancel</button>";
            save();
            cancel();
        }
    }
}
//print button
printButton.onclick = print;

function print() {
    if (!document.getElementById('printtbl')) {

        var printtbl = document.createElement('table');
        printtbl.setAttribute('id', 'printtbl');
        printtbl.setAttribute('class', 'table-style');
        document.getElementById('printTable').appendChild(printtbl);
        printtbl.innerHTML = "<tr><th>Name</th><th>Email</th><th>Age</th>";
        for (var c = 0; c < personsArray.length; c++) {
            printtbl.innerHTML += "<tr><td>" + personsArray[c].name + "</td><td>" + personsArray[c].email + "</td><td>" + personsArray[c].age + "</td></tr>";
        }

        // } 
        // else {
        //this was supposed to print new added value but unfortunately it didn't work the way I wanted :(
        //     for (var u = l - 1; u < personsArray.length; u++) {
        //         printtbl.innerHTML += "<tr><td>" + personsArray[u].name + "</td><td>" + personsArray[u].email + "</td><td>" + personsArray[u].age + "</td></tr>";
        //     }
    }
}

//clear button
clearButton.onclick = function() {
    document.getElementById('userName').value = "";
    document.getElementById('email').value = "";
    document.getElementById('age').value = "";
    document.getElementById('password').value = "";
}

//save button
function save() {

    for (var x = 0; x < document.getElementsByClassName('saveUpdates').length; x++) {
        document.getElementsByClassName('saveUpdates')[x].onclick = function() {
            var newGender = selectedGender,
                newPassword = oldValues[2],
                newSelectedCountry = selectedCountry,
                newInterestsArray = interestsArray.slice();
            this.parentElement.parentElement.children[0].innerHTML = document.getElementById("nameNewValue").value;
            //email textbox
            this.parentElement.parentElement.children[1].innerHTML = document.getElementById("emailNewValue").value;
            //password textbox
            if (document.getElementById("passwordNewValue").value == "") {
                newPassword = oldValues[2];
            } else {
                newPassword = document.getElementById("passwordNewValue").value;
            }
            //newPassword = document.getElementById("passwordNewValue").value;
            this.parentElement.parentElement.children[2].innerHTML = "<p id='show'>Show</p>";
            document.getElementById('show').onclick = function() {
                    this.parentElement.parentElement.children[2].innerHTML = newPassword;
                }
                //age text box
            this.parentElement.parentElement.children[3].innerHTML = document.getElementById("ageNewValue").value;
            //gender radio buttons
            if (male1.checked) {
                newGender = "male";
            } else if (female1.checked) {
                newGender = "female";
            }
            this.parentElement.parentElement.children[4].innerHTML = newGender;
            //interests
            for (var k = 0; k < document.getElementsByName('interests1').length; k++) {
                if (document.getElementsByName('interests1')[k].checked) {
                    newInterestsArray[k] = document.getElementsByName('interests1')[k].value;
                } else {
                    newInterestsArray[k] = " ";
                }
            }
            this.parentElement.parentElement.children[5].innerHTML = newInterestsArray;
            //country
            if (document.getElementById('newDropDown').selectedIndex != 0) {
                var newIndex = document.getElementById('newDropDown').selectedIndex;
                document.getElementById('countryValidator').innerHTML = " ";
                newSelectedCountry = document.getElementById('newDropDown')[newIndex].value;
            }
            this.parentElement.parentElement.children[6].innerHTML = newSelectedCountry;
            //here we need to replace old objects with the new object
            var rowIndex = this.parentElement.parentElement.rowIndex - 1;
            personsArray[rowIndex].name = this.parentElement.parentElement.children[0].innerHTML;
            personsArray[rowIndex].email = this.parentElement.parentElement.children[1].innerHTML;
            personsArray[rowIndex].age = this.parentElement.parentElement.children[3].innerHTML;
            this.parentElement.innerHTML = "<button type = 'button' value = 'Update' class = 'button updateBtn' >Update</button>";
            update();
        }

    }
}
//cancle button down this comment
function cancel() {
    for (var h = 0; h < document.getElementsByClassName('cancel').length; h++) {
        document.getElementsByClassName('cancel')[h].onclick = function() {
            //user name
            this.parentElement.parentElement.children[0].innerHTML = oldValues[0];
            //email textbox
            this.parentElement.parentElement.children[1].innerHTML = oldValues[1];
            //password text box
            this.parentElement.parentElement.children[2].innerHTML = oldValues[2];
            //age text box
            this.parentElement.parentElement.children[3].innerHTML = oldValues[3];
            //gender radio buttons
            this.parentElement.parentElement.children[4].innerHTML = oldValues[4];
            //interests
            this.parentElement.parentElement.children[5].innerHTML = oldValues[5];
            //country
            this.parentElement.parentElement.children[6].innerHTML = oldValues[6];
            //issue here when we clicked cancel it shows update button but if we click update again it stops
            this.parentElement.innerHTML = "<button type = 'button' value = 'Update' class = 'button updateBtn' >Update</button>";
            update();

        }
    }
}