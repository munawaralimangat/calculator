const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

let currentInput = "";
let currentOperator = "";
let pendingInput = "";
let resultDisplayed = false;

buttons.forEach(button=>{
    button.addEventListener("click",()=>{
        const buttonText = button.textContent;

        if(buttonText === "C"){
            clearCalculator();
        }else if(buttonText === "&#9003;"){
            handleBackspace();
        }else if(buttonText === "="){
            calculateResult();
        }else if(buttonText === "+" || buttonText === "-" || buttonText === "*" || buttonText === "/"){
            handleOpertor();
        }else{
            handleDigit();
        }
    });
});

function clearCalculator(){
    currentInput = "";
    currentOperator = "";
    pendingInput = "";
    resultDisplayed = false;
    display.textContent = "0"
}

function handleBackspace(){
    if(!resultDisplayed){
        currentInput = currentInput.slice(0,-1);
        display.textContent = currentInput || "0"
    }
}

function handleOpertor(){
    if(!resultDisplayed){
        if(currentOperator){
            calculateResult();
        }
        currentOperator = operator;
        pendingInput = currentInput;
        currentInput = "";
    }
}

function handleDigit(digit){
    if(!resultDisplayed){
        if(digit === "." && currentInput.include(".")){
            return;
        }
        currentInput += digit;
        display.textContent = currentInput
    }
}

function calculateResult(){
    if(!resultDisplayed){
        const num1 = parseFloat(pendingInput);
        const num2 = parseFloat(currentInput)

        if(!isNaN(num1) && !isNaN(num2)){
            switch(currentOperator){
             case "+":
                currentInput = (num1 + num2).toString();
                break;
             case "-":
                currentInput = (num1 - num2).toString();
                break;
             case "*":
                currentInput = (num1 * num2).toString();
                break;
             case "/":
                if(num2 != 0){
                    currentInput = (num1/num2).toString()
                }else{
                    currentInput = "Error";
                }
                break;
            }
            display.textContent = currentInput;
            currentOperator = "";
            pendingInput = "";
            resultDisplayed = true;
        }
    }
}

clearCalculator()