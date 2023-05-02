const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;

let input = '', previnput = '', x, y, op = '', hasOperator = false;

const operate = (x, y, op) => {
    switch (op) {
        case '+': return add(x, y);
        case '−': return subtract(x, y);
        case '×': return multiply(x, y);
        case '÷': return divide(x, y);
    }
}

const numButtons = document.querySelectorAll('.num');
numButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (hasOperator) return;
        input += button.textContent;
        document.querySelector('.now').textContent = input; // actualizar número actual
    });
});

const opButtons = document.querySelectorAll('.op');
opButtons.forEach(button => {
    button.addEventListener('click', () => {
        hasOperator = false;
        // guardar el primer input
        if (x == null) {
            x = parseFloat(input);
            previnput += input;
            document.querySelector('.prev').textContent = previnput;
        }
        // guardar los demas input
        else if (x != null && y == null && input != '') {
            y = parseFloat(input);
            x = operate(x, y, op); // hacer la operacion (x,y) y guardarlo en x
            if (previnput != '') previnput += op;
            previnput += y;
            document.querySelector('.prev').textContent = previnput;
            // reiniciar el input y deja ingresar numeros denuevo
            y = null;
        }
        document.querySelector('.now').textContent = x, input = '';
        // cambio la operacion al final, para que haga la operacion con el segundo numero primero
        op = button.textContent;
        if (op == '=') {
            y = null, hasOperator = true;
            previnput = ''; document.querySelector('.prev').textContent = '';
        }
    });
});

const ac = () => {
    x = y = null; input = previnput = op = ''; hasOperator = false;
    document.querySelector('.now').textContent = document.querySelector('.prev').textContent = input;
}
const neg = () => {
    if (hasOperator) x *= -1, document.querySelector('.now').textContent = x;
    else {
        input = input.startsWith('-') ? input.slice(1) : `-${input}`;
        document.querySelector('.now').textContent = input;
    }
}

const del = () => {
    if (!hasOperator) {
        input = input.slice(0, -1);
        document.querySelector('.now').textContent = input;
    }
};

const modButtons = document.querySelectorAll('.mod');
modButtons.forEach(button => {
    button.addEventListener('click', () => {
        switch (button.textContent) {
            case 'AC': {
                ac();
                break;
            }
            case '+/−': {
                neg();
                break;
            }
            case 'DEL': {
                del();
                break;
            }
        }
    });
});

document.addEventListener('keydown', (event) => {
    // Si la tecla presionada es un número, agregamos el dígito al input
    if (/^[0-9]$/.test(event.key)) {
        if (hasOperator) return;
        input += event.key;
        document.querySelector('.now').textContent = input;
    }
    // Si la tecla presionada es un operador, ejecutamos la operación correspondiente
    else if (/^[\+\-\*\/]$/.test(event.key) || event.key === 'Enter') {
        hasOperator = false;
        if (x == null) x = parseFloat(input);
        else if (x != null && y == null && input != '') {
            y = parseFloat(input);
            x = operate(x, y, op);
            y = null;
        }
        document.querySelector('.now').textContent = x, input = '';
        op = event.key;
        if (op == 'Enter') y = null, hasOperator = true;
    }
    // Si la tecla presionada es Delete, borramos el último dígito
    else if (event.key === 'Backspace') {
        del();
    }
    // Si la tecla presionada es Escape, borramos todo
    else if (event.key === 'Escape') {
        ac();
    }
    // Si la tecla presionada es s, cambiamos de signo
    else if (event.key === 's') {
        neg();
    }
});

