// Store the current operands and operator
let firstNumber = undefined
let operator = undefined
let secondNumber = undefined

let digitCounter = 0
let isNewNumberEntered = true; 
let calcResult = 0
let decimalBtnClicked = false
let preventOperate = false 
let isNumber = true 

const screen = document.querySelector('#screen')
const historyNumber = document.querySelector('#history-number')
const historyOperator = document.querySelector('#history-operator')

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
            preventOperate = false
        }
        else if(digitCounter < 10){
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
    return (a + b)
}

function subtract(a, b) {
    return (a - b)
}

function multiply(a, b) {
    return (a * b)
}

function divide(a, b) {
    if(b == 0) {
        return 'Oops!'
    }
    return (a / b)
}


// Math Operator button handling
const mathOperators = document.querySelectorAll('.operator')
mathOperators.forEach((mathOperator) => {
    mathOperator.addEventListener('click', (event) => {
        
        if(!preventOperate){
            if(isNewNumberEntered){
                isNewNumberEntered = false
                digitCounter = 0
                decimalBtnClicked = false
                if(firstNumber == undefined){
                    firstNumber = screen.textContent
                    operator = event.target.textContent
                    historyNumber.textContent = firstNumber
                    historyOperator.textContent = operator
                }
                else {
                    secondNumber = screen.textContent
                    calcResult = operate(firstNumber, secondNumber, operator)
                    isNumber = shapeResult(calcResult)
                    //Checking the validity of the calculated value
                    if(isNumber) {
                        // The calculation result is allowed (It's a number)
                        firstNumber = calcResult
                        operator = event.target.textContent
                        screen.textContent = calcResult
                        historyNumber.textContent = calcResult
                        historyOperator.textContent = operator
                    }
                    else {
                        // The calculation result is not allowed
                        preventOperate = true
                        firstNumber = undefined
                        screen.textContent = calcResult
                        historyNumber.textContent =''
                        historyOperator.textContent = '*Try Again*'
                    }
                }
            }
            else {
                operator = event.target.textContent
                historyOperator.textContent = operator
            }
        }
    })
})


// Equal Button handling
const equal = document.querySelector('#equal')
equal.addEventListener('click', (event) => {
    if(!preventOperate){
        if(firstNumber != undefined) {
            secondNumber = screen.textContent
            calcResult = operate(firstNumber, secondNumber, operator)
            isNumber = shapeResult(calcResult)
            if(!isNumber) {
                //// The calculation result is not allowed
                preventOperate = true
            }
            screen.textContent = calcResult
            // Reset first number, digit counter and decimal button flag
            firstNumber = undefined
            digitCounter = 0
            decimalBtnClicked = false
            isNewNumberEntered = true;
            // Reset history box
            historyNumber.textContent = ''
            historyOperator.textContent = ''
        }
    }
})

//decimal button handling
const decimalBtn = document.querySelector('#decimal')
decimalBtn.addEventListener('click', (event) => {
    if(digitCounter == 0 && !decimalBtnClicked) {
        preventOperate = false
        isNewNumberEntered = true
        screen.textContent = '0.'
        digitCounter += 2
        decimalBtnClicked = true;
    } else if(!decimalBtnClicked && digitCounter < 10) {
        screen.textContent += '.'
        digitCounter++
        decimalBtnClicked = true;
    }
})

// Handle the AC (All Clear) button
const clearBtn = document.querySelector('#ac')
clearBtn.addEventListener('click', () => resetCalculator())

function resetCalculator(){
    firstNumber = undefined
    operator = undefined
    secondNumber = undefined
    digitCounter = 0
    isNewNumberEntered = true;
    calcResult = 0
    decimalBtnClicked = false
    screen.textContent = 0;
    preventOperate = false
    isNumber = true
    historyNumber.textContent =''
    historyOperator.textContent =''
}

// Handle DEL (backspace) button
const delBtn = document.querySelector('#del')
delBtn.addEventListener('click', () => {
    if(digitCounter != 0) {
        if(screen.textContent === '0.') {
            screen.textContent = '0'
            decimalBtnClicked = false
            digitCounter = 0
        }
        else {
            if(screen.textContent.length == 1) {
                screen.textContent = '0'
            }
            else if(screen.textContent[screen.textContent.length - 1] == '.'){
                screen.textContent = screen.textContent.substr(0,(screen.textContent.length-1))
                decimalBtnClicked = false
            }
            else {
                screen.textContent = screen.textContent.substr(0,(screen.textContent.length-1))
            }
            digitCounter--
        }
    }
})


// shape the result and checking the validity of the result
function shapeResult(result) {
    if(typeof result == "number" && result != NaN){
        // The result is a number
        // Remove extra zeros in the decimal. Round numbers with more than 8 decimal digits.
        calcResult = parseFloat(Math.round(calcResult * 1000000000)/1000000000)

        // if the result length is too big for screen, change the result precision or throw a error message
        if(calcResult.toString().length > 10){
            if(calcResult > 0) {
                calcResult = calcResult.toPrecision(5) //now the screen supports up to +9.9999e+99 (positive number)
            }
            else {
                calcResult = calcResult.toPrecision(4) //now the screen supports up to -9.999e+99 (negative number)
            }
            
            // If an overflow still occurs despite reducing the precision, display an error message
            if(calcResult.toString().length > 10) {
            calcResult = 'Overflow!'
            // The result is not within the allowed range
            return false
            } 
        }
        return true 
    }
    else {
        // The result is not allowed
        return false
    }
        
}



