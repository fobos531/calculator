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

let display = document.querySelector('.display span');
let currentExpression = document.getElementById("currentExpression");
let buttons = Array.from(document.querySelectorAll('.buttons'));

function evaluateExpression (expr) {
    let expression = expr.split(/([+*\/-])/gi);
    // deal with * and /
    for (let i = 0; i < expression.length; i++){
		if (expression[i] === '*' || expression[i] === '/'){
			const result = operate(expression[i], expression[i-1], expression[i+1]);
			expression.splice(i-1, 3, result);
			i = i-1;
		}
    }
    // deal with + and -
    for (let i = 0; i < expression.length; i++){
		if (expression[i] === '+' || expression[i] === '-'){
			const result = operate(expression[i], expression[i-1], expression[i+1]);
			expression.splice(i-1, 3, result);
			i = i-1;
		}
	}
    return expression.join("");
}

function pressOperator(operator, expr) {
    if (operator == "=") {
        let final = currentExpression.textContent + expr;
        display.textContent = evaluateExpression(final);
        currentExpression.textContent = "";
    }
    else if (operator == "+/-") {
        let arr = [...expr];
        arr.includes("-") ? arr.splice(0,1) : arr.unshift("-");
        display.textContent = arr.join("");
    }
    else {
        currentExpression.textContent += expr + operator;
        display.textContent = "0";
    }
}

function pressButton(e) {
    switch (e.target.textContent) {
        case "Clear": display.textContent = ""; currentExpression.textContent = ""; break;
        case "⌫": display.textContent = display.textContent.slice(0, -1); break;
        case "/": pressOperator("/", display.textContent); break;
        case "*": pressOperator("*", display.textContent); break;
        case "-": pressOperator("-", display.textContent); break;
        case "+": pressOperator("+", display.textContent); break;
        case "+/-": pressOperator("+/-", display.textContent); break;
        case "=": pressOperator("=", display.textContent); break;
        default: if (display.textContent == 0) display.textContent = e.target.textContent;
                else display.textContent += e.target.textContent; break;
    }
}

function keypressHandler (e) {
    const keyCodes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 187, 189, 190, 191, 13, 8];
    if (keyCodes.includes(e.keyCode)) {
        if(e.keyCode == 8) { //Backspace
            display.textContent = display.textContent.slice(0, -1); return;
        }
        if (e.key == "Enter") {
            display.textContent = evaluateExpression(display.textContent);
            return;
        }
        display.textContent += e.key;
    }
}
buttons.forEach(button => button.addEventListener('click', pressButton));
window.addEventListener('keydown', keypressHandler);