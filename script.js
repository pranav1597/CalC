class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        
    }

    // to clear all the numbers 
    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    // to delete the number
    delete(){
        this.currentOperand = this.currentOperand.slice(0,-1);
    }

    //to display the numbers when click on it
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return;
        
        if(this.currentOperand){
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
        else{
            this.currentOperand = number;
        }
    }

    // to choose the operator
    chooseOperation(operation){
        if(!this.currentOperand) return;
        if(this.previousOperand){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    // to take the values of previous and current and compute it
    compute(){
        let computation;
        let prev = parseFloat(this.previousOperand);
        let current = parseFloat(this.currentOperand);

        if(!prev || !current) return;

        switch(this.operation){
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }


    // getDisplayNumber(number){
    //     const stringNumber = number.toString();
    //     const integerDigits = stringNumber.split('.')[0];
    //     const decimalDigits = stringNumber.split('.')[1];
    //     let integerDisplay;
    //     if(isNaN(integerDisplay)){
    //         integerDisplay = '';
    //     }else{
    //         integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits:0}) 
    //     }

    //     if(decimalDigits){
    //         return `${integerDisplay}.${decimalDigits}`
    //     }
    //     else{
    //         return integerDisplay;
    //     }
    // }

    // update the values on the output
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand;
        if(this.operation){
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;    
        }else{
            this.previousOperandTextElement.innerText = '';
        }
        
    }
}





const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');


const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);

// for number button
numberButtons.forEach(button => {
    button.addEventListener('click',() =>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay()
    })
})

// for operation button
operationButtons.forEach(button => {
    button.addEventListener('click',() =>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay()
    })
    
})

// for equal button
equalsButton.addEventListener('click',() =>{
    calculator.compute();
    calculator.updateDisplay()
})

// for all clear button
allClearButton.addEventListener('click',() =>{
    calculator.clear();
    calculator.updateDisplay()
})

// for delete a number button
deleteButton.addEventListener('click',() =>{
    calculator.delete();
    calculator.updateDisplay()
})

// for toggle button

const checkbox = document.getElementById('checkbox');

checkbox.addEventListener('change', () => {
    // change the theme of the calculator
    document.body.classList.toggle('dark');
    
})




