/*==========variables===========================*/
let digits = document.querySelectorAll('.digit');
let mathOperations = document.querySelectorAll('.math-operation');
let decimalButton = document.getElementById('decimal');
let result = document.getElementById('result');
let clearButtons = document.getElementsByClassName('delete');
let howItWorksButton = document.getElementById('demo-button');
let display = document.getElementById('display');
let resultNumber = '';
let memoryPendingOperation = '';
let lastClickOperation = false;
let operationsList = document.getElementById('operations-list');
let showItWorks = true;

/*==================events===================*/
for (let i = 0; i < digits.length; i++) {
    let digit = digits[i];
    digit.addEventListener('click', function (e) {
        numberPress(e.target.textContent);
    });
}

for (let i = 0; i < mathOperations.length; i++) {
    let mathOperation = mathOperations[i];
    mathOperation.addEventListener('click', function (e) {
        operation(e.target.textContent);
    })
}

decimalButton.addEventListener('click', decimal);

result.addEventListener('click', onResult);

for (let i = 0; i < clearButtons.length; i++) {
    let clearButton = clearButtons[i];
    clearButton.addEventListener('click', function (e) {
        clear(clearButton.id);
    })
}

howItWorksButton.addEventListener('click', showHowItWorks);

/*===================functions===============================*/
function numberPress(number) {
    if (lastClickOperation) {
        display.value = '0';
    }
    display.value = display.value === '0' ? number : display.value + number;
    lastClickOperation = false;
}

function onResult() {
    applyOperation();
    resultNumber = '';
    lastClickOperation = true;
}

function operation(symbol) {
    if (resultNumber) {
        applyOperation()
    } else {
        resultNumber = display.value;
    }

    switch (symbol) {
        case '+':
            memoryPendingOperation = '+';
            break;
        case '-':
            memoryPendingOperation = '-';
            break;
        case '/':
            memoryPendingOperation = '/';
            break;
        case '*':
            memoryPendingOperation = '*';
            break;
    }
    lastClickOperation = true;
    console.log("click operation " + symbol);
}

function decimal() {
    if (!display.value.includes('.')) {
        if (lastClickOperation) {
            display.value = '0';
        }
        display.value += '.';
        lastClickOperation = false;

    }
}

function clear(id) {
    if (id === 'delete') {
        display.value = '0';
    } else if (id === 'clear') {
        display.value = '0';
        resultNumber = false;
    }
    console.log(`Click button with id ` + id)
}

function showHowItWorks(argument) {
    if (showItWorks) {
        for (let i = 0; i < mathOperations.length; i++) {
            let newLi = document.createElement('li');
            newLi.innerText = mathOperations[i].value;
            let htmlLiElement = operationsList.appendChild(newLi);
        }
        showItWorks = false;
    }
}

function applyOperation() {
    if (resultNumber && memoryPendingOperation) {
        switch (memoryPendingOperation) {
            case '+':
                display.value = parseFloat(((+resultNumber) + (+display.value)).toPrecision(14));
                resultNumber = display.value;
                break;
            case '-':
                display.value = parseFloat(((+resultNumber) - (+display.value)).toPrecision(14));
                resultNumber = display.value;
                break;
            case '/':
                display.value = parseFloat(((+resultNumber) / (+display.value)).toPrecision(14));
                resultNumber = display.value;
                break;
            case '*':
                display.value = parseFloat(((+resultNumber) * (+display.value)).toPrecision(14));
                resultNumber = display.value;
                break;
        }
    }
}