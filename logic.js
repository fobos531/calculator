const add = (a,b) => Number(a) + Number(b);
const subtract = (a,b) => Number(a) - Number(b);
const multiply = (a,b) => Number(a) * Number(b);
const divide = (a,b) => Number(a) / Number(b);

const operate = (op, a, b) => {
    switch(op) {
        case "+": return add(a,b);
        case "-": return subtract(a,b);
        case "*": return multiply(a,b);
        case "/": return divide(a,b);
        default: return;
    }
}

const display = document.querySelector('.display span');
let previousExpr = document.getElementById("previousExpr");

let previousOperator = "";
let buttons = Array.from(document.querySelectorAll('.buttons'));
//add event listener to every button
buttons.forEach(button => button.addEventListener('click', pressButton));


function calculateMulDiv(expression) {
    let toEval = expression.split(/(\d+)/gi); // properly split the expression if there are multi-digit numbers
    toEval.pop();
    toEval.shift();
   //  let toEval = previousExpr.match(/(\d[/*]\d)/gi).join("").split(""); //takes out parts with * and / from expression and places
    // the accompanying operands next to them
    let results = [];
    let firstOperand;
    let secondOperand;
    let operator;
    for (let i=0; i < expression.length; i++) {
        if (i % 3 == 0) firstOperand = toEval.shift(); //first iteration
        else if (i%3 == 1) operator = toEval.shift();
        else if (i%3 == 2) {
            secondOperand = toEval.shift();
            results.push(operate(operator, firstOperand, secondOperand));
        }
    }
    return results[0] + '';
}


function evEx (previousExpr) {
    let regex = /(\d+[/*]\d+)/gi;
    //replace original expression with calculated multiplication and division, if there are any
    let expression = previousExpr.replace(regex, str => calculateMulDiv(str)).split(/(\d+)/gi);
    expression.pop(); expression.shift();
    const exprLength = expression.length;
   // let expression = previousExpr.split("");
    let firstOperand;
    let secondOperand;
    let operator;
    for (let i=1; i <= exprLength; i++) {
        if (i == 1) firstOperand = expression.shift(); //first iteration
        else if (i%2 == 0) operator = expression.shift();
        else if (i%2 != 0) {
            secondOperand = expression.shift();
            firstOperand = operate(operator, firstOperand, secondOperand);
        }
    }
    return firstOperand; //firstOperand is the actual result
}

function pressOperator(operator, expr) {
    if (operator == "=") {
        let final = previousExpr.textContent + expr;
        console.log(evEx(final));
        display.textContent = evEx(final);
        previousExpr.textContent = "";
    }
    //console.log(operate(previousOperator, expr, previousExpr)); //previous expression
    else {
        previousExpr.textContent += expr + operator;
        display.textContent = "0";
        previousOperator = operator;
       // previousExpr = operate(operator, previousExpr, expr);
    }
}

function pressButton(e) {
    switch (e.target.textContent) {
        case "Clear": display.textContent = ""; previousExpr.textContent = ""; break;
        case "⌫": display.textContent = display.textContent.slice(0, -1); break;
        case "/": pressOperator("/", display.textContent); break;
        case "*": pressOperator("*", display.textContent); break;
        case "-": pressOperator("-", display.textContent); break;
        case "+": pressOperator("+", display.textContent); break;
        case "=": pressOperator("=", display.textContent); break;
        default: if (display.textContent == 0) display.textContent = e.target.textContent;
                else display.textContent += e.target.textContent; break;
    }
}
