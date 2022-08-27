class Calculator {
    constructor(previous, current) {
        this.previous = previous
        this.current = current
        this.clear()
    }
  
    clear() {
        this.currentElement = ''
        this.previousElement = ''
        this.operation = undefined
    }
  
    delete() {
        this.currentElement = this.currentElement.toString().slice(0, -1)
    }
  
    append(number) {
        if (number === '.' && this.currentElement.includes('.')) return
        this.currentElement = this.currentElement.toString() + number.toString()
    }

    choose(operation) {
        if (this.currentElement === '') return
        if (this.previousElement !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousElement = this.currentElement
        this.currentElement = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousElement)
        const current = parseFloat(this.currentElement)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentElement = computation
        this.operation = undefined
        this.previousElement = ''
    }

    display(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        }
        else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        }
        else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.current.innerText =
        this.display(this.currentElement)
        if (this.operation != null) {
            this.previous.innerText =
            `${this.display(this.previousElement)} ${this.operation}`
        }
        else {
            this.previous.innerText = ''
        }
    }
}

const btnNumber = document.querySelectorAll('[data-number]')
const btnOperation = document.querySelectorAll('[data-operation]')
const btnEquals = document.querySelector('[data-equals]')
const btnDelete = document.querySelector('[data-delete]')
const btnClear = document.querySelector('[data-all-clear]')
const previous = document.querySelector('[data-previous]')
const current = document.querySelector('[data-current]')

const calculator = new Calculator(previous, current)
btnNumber.forEach(button => {
    button.addEventListener('click', () => {
        calculator.append(button.innerText)
        calculator.updateDisplay()
    })
})

btnOperation.forEach(button => {
    button.addEventListener('click', () => {
        calculator.choose(button.innerText)
        calculator.updateDisplay()
    })
})

btnEquals.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

btnClear.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

btnDelete.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})