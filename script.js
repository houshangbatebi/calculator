// store the current operands and operator
let firstNumber
let operator
let secondNumber

// Do calculation
function operate(firstNum, secondNum, operator) {
    if (operator == '+') {
        return add(firstNum, secondNum)
    }
    if (operator == '-') {
        return subtract(firstNum, secondNum)
    }
    if (operator = '*') {
        return multiply(firstNum, secondNum)
    }
    if (operator == '/') {
        return divide(firstNum, secondNum)
    }
}

// Basic math functions
function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}
