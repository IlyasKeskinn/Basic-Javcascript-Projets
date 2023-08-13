// Form and input elements
const registerForm = document.getElementById("register-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const tel = document.getElementById("tel");
const password = document.getElementById("password");
const repassword = document.getElementById("repassword");

// Function to display error state for an input
function errorInput(input, msg) {
    input.className = "form-control is-invalid";
    const div = input.nextElementSibling;
    div.className = "invalid-feedback";
    div.innerText = msg;
}

// Function to display success state for an input
function succesInput(input) {
    input.className = "form-control is-valid";
}

// Function to check required fields
function checkRequired(inputs) {

    inputs.forEach(function (input) {
        if (input.value === "") {
            errorInput(input, toCapitalCase(input.id) + ' is required')
        }
        else {
            succesInput(input)
        }
    })
}

// Function to check valid email format
function chechkEmail(emailAdress) {
    const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (re.test(emailAdress.value)) {
        succesInput(emailAdress);
    } else {
        errorInput(emailAdress, "Enter a valid e-mail address");
    }

}

// Function to check input length within specified range
function checkLength(input, min, max) {

    if (input.value.length <= min) {
        errorInput(input, `${toCapitalCase(input.id)} cannot be shorter than ${min} characters`);
    } else if (input.value.length > max) {
        errorInput(input, `${toCapitalCase(input.id)} cannot be longer than ${max} characters`);
    }
    else {
        succesInput(input);
    }
}

// Function to match password fields
function matchPassword(password1, password2) {
    if (password1.value !== password2.value) {
        errorInput(password2, "Passwords do not match")
    }
}

// Function to validate phone number
function checkPhone(input) {
    const ex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (!ex.test(input.value)) {
        errorInput(input, "The phone number is wrong.");
    } else {
        succesInput(input);
    }
}

// Function to capitalize the first letter of a string
const toCapitalCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};


// Event listener for form submission
registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Perform validations
    checkRequired([username, email, tel, password, repassword]);
    chechkEmail(email);
    checkLength(username, 3, 20)
    checkLength(password, 6, 20)
    checkLength(repassword, 6, 20)
    matchPassword(password, repassword);
    checkPhone(tel);
})