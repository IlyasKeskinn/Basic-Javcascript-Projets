const display = document.querySelector(".calculator-input");
const calculatorKeys = document.querySelector(".calculator-keys");

let displayValue = "0";
let firstValue = null;
let watingSecondValue = false;
let operator = null;

updateDisplay();

function updateDisplay() {
    display.value = displayValue;
}

calculatorKeys.addEventListener("click", function (e) {
    let key = e.target;
    let keyValue = key.value;

    if (!(key.matches("button"))) return;

    switch (keyValue) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=' :
            handeOperator(keyValue);
            break;

        case 'clear':
            clear();
            break;

        case '.':
            decimal()
            break;

        default:
            inputNumber(keyValue);
            break;
    }
    updateDisplay();

})




function clear() {
    displayValue = "0";
    firstValue = null;
    watingSecondValue = false;
}

function decimal() {
    if (!(displayValue.includes("."))) {
        displayValue = displayValue + "."
    }
}

function handeOperator(opt) {
    const value = parseFloat(displayValue);

    if (operator && watingSecondValue) {
        operator = opt;
        return;
    }

    if (firstValue === null) {
        firstValue = value;
    } else if (operator) {
        const result = calculate(firstValue, value, operator);

        displayValue = `${parseFloat(result)}`;
        firstValue = result;
    }

    watingSecondValue = true;
    operator = opt;

}

function calculate(firstNum, secondNum, operatorValue) {


    if (operatorValue == "+") {


        return result = (firstNum + secondNum);

    } else if (operatorValue == "-") {
        return (firstNum - secondNum);

    }
    else if (operatorValue == "/") {
        return (firstNum / secondNum);

    }
    else if (operatorValue == "*") {
        return (firstNum * secondNum);

    }

    return result;

}
function inputNumber(num) {
    if (!watingSecondValue) {
        displayValue = displayValue == "0" ? num : displayValue + num;
    } else {
        displayValue = num;
        watingSecondValue = false;
    }
}