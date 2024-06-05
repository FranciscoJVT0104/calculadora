let currentInput = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;
let justCalculated = false;

function appendNumber(number) {
    if (justCalculated) {
        clearDisplay();
        justCalculated = false;
    }
    if (waitingForSecondOperand) {
        currentInput = number;
        waitingForSecondOperand = false;
    } else {
        currentInput = currentInput === '0' ? number : currentInput + number;
    }
    updateDisplay();
}

function appendDecimal() {
    if (justCalculated) {
        clearDisplay();
        justCalculated = false;
    }
    if (waitingForSecondOperand) {
        currentInput = '0.';
        waitingForSecondOperand = false;
    } else if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

function updateDisplay() {
    const display = document.querySelector('.display');
    if (firstOperand !== null && operator !== null && !waitingForSecondOperand) {
        display.textContent = `${firstOperand} ${operator} ${currentInput}`;
    } else {
        display.textContent = currentInput;
    }
}

function operate(nextOperator) {
    if (justCalculated) {
        justCalculated = false;
    }
    const inputValue = parseFloat(currentInput);
    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        updateDisplay();
        return;
    }

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = calculateResult(firstOperand, inputValue, operator);
        currentInput = String(result);
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
    updateDisplay();
}

function calculate() {
    if (operator === null || waitingForSecondOperand) return;
    const inputValue = parseFloat(currentInput);
    const result = calculateResult(firstOperand, inputValue, operator);

    const display = document.querySelector('.display');
    display.textContent = `${result}`;    
    currentInput = String(result);
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    justCalculated = true;
}

function calculateResult(firstOperand, secondOperand, operator) {
    switch (operator) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case '*':
            return firstOperand * secondOperand;
        case '/':
            if (secondOperand === 0) {
                alert('Error: División por cero');
                return null;
            }
            return firstOperand / secondOperand;
        default:
            return secondOperand;
    }
}

function toggleMode() {
    const body = document.body;
    const modeButton = document.querySelector('.mode-toggle');

    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        modeButton.textContent = '🌞  Modo Claro';
    } else {
        modeButton.textContent = '🌜  Modo Oscuro';
    }
}