import {CLS_BUTTON} from "../utility/const";

export function createButton(text, color) {
    const button = document.createElement('div');
    button.style.padding = '15px 50px';

    if (color) {
        button.style.backgroundColor = color;
    }
    
    // aggiungo le classi css
    button.classList.add(...CLS_BUTTON);

    // testo del bottone
    const spanTextButton = document.createElement('span');
    spanTextButton.innerHTML = text;
    button.appendChild(spanTextButton);

    return button;
}

export function disableButtons(buttonsContext, clicks) {
    buttonsContext.childNodes.forEach(button => {
        button.style.background = 'gray';
        button.classList.remove('btn-start-hover');
        button.style.cursor = 'auto';
        // rimuovo i click
        button.removeEventListener('click', clicks[0]);
        button.removeEventListener('click', clicks[1]);
    });
}
