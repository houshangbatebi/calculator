// Store the current operands and operator
let firstNumber = undefined
let operator = undefined
let secondNumber = undefined

let digitCounter = 0
let isNewNumberEntered = false;
let calcResult
let decimalBtnClicked = false

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
            // Update new number flag
            isNewNumberEntered = true;
        }
        else if(digitCounter > 0 && digitCounter < 10){
            screen.textContent += event.target.textContent
            digitCounter++
        }
    })
})

// Do calculation
function operate(firstNum, secondNum, operator) {
    if (operator == '+') {
        return add(Number(firstNum), Number(secondNum))
    }
    if (operator == '-') {
        return subtract(Number(firstNum), Number(secondNum))
    }
    if (operator == '*') {
        return multiply(Number(firstNum), Number(secondNum))
    }
    if (operator == '/') {
        return divide(Number(firstNum), Number(secondNum))
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


// Math Operator button handling
const mathOperators = document.querySelectorAll('.operator')
mathOperators.forEach((mathOperator) => {
    mathOperator.addEventListener('click', (event) => {
        if(firstNumber == undefined) {
            firstNumber = screen.textContent
            operator = event.target.textContent
        }
        else{
            if(digitCounter == 0 && !isNewNumberEntered){
                // No new number entered
                operator = event.target.textContent
            }
            else {
                secondNumber = screen.textContent
                calcResult = operate(firstNumber, secondNumber, operator)
                //update operator and firstNumber for next calculation round
                operator = event.target.textContent
                firstNumber = calcResult
                //update screen
                screen.textContent = calcResult
            }
        }
        // Reset digit counter and decimal btn flag to receiving new number
        digitCounter = 0
        isNewNumberEntered = false
        decimalBtnClicked = false
    })
})

// Equal Button handling
const equal = document.querySelector('#equal')
equal.addEventListener('click', (event) => {
    if(firstNumber != undefined) {
        secondNumber = screen.textContent
        screen.textContent = operate(firstNumber, secondNumber, operator)
        // Reset first number, digit counter and decimal button flag
        firstNumber = undefined
        digitCounter = 0
        decimalBtnClicked = false
    }
})

//decimal button handling
const decimalBtn = document.querySelector('#decimal')
decimalBtn.addEventListener('click', (event) => {
    if(digitCounter == 0 && !decimalBtnClicked) {
        screen.textContent = '0.'
        digitCounter += 2
        decimalBtnClicked = true;
    } else if(!decimalBtnClicked && digitCounter < 10) {
        screen.textContent += '.'
        digitCounter++
        decimalBtnClicked = true;
    }
})


