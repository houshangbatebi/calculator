// Store the current operands and operator
let firstNumber = 0
let operator = undefined
let secondNumber = undefined

let currentNumber = 0
let digitCounter = 0

const screen = document.querySelector('#screen')

// Digit button click handling
const digitButtons = document.querySelectorAll('.digit')
digitButtons.forEach((digitBtn) => {
    digitBtn.addEventListener('click', (event) => {
        if(digitCounter == 0) {
            if(event.target.textContent != 0) {
                screen.textContent = event.target.textContent
                digitCounter++
            } else {
                screen.textContent = 0
            }
        }
        else if(digitCounter > 0 && digitCounter < 10){
            screen.textContent += event.target.textContent
            digitCounter++
        }
        currentNumber = screen.textContent
    })
})

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
