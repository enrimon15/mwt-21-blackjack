import {setStyle} from "../utility/setStyle";
import {CLS_BUTTON} from "../utility/const";

export function createButton(text, color) {
    const button = document.createElement('div');
    button.style.padding = '15px 50px';

    if (color) {
        button.style.backgroundColor = color;
    }
    
    // aggiungo le classi css
    button.classList.add(...CLS_BUTTON);

    // teso del bottone
    const spanTextButton = document.createElement('span');
    spanTextButton.innerHTML = text;
    button.appendChild(spanTextButton);

    return button;
}

export function disableButtons(buttonsContext) {
    buttonsContext.childNodes.forEach(button => {
        button.style.background = 'gray';
        button.classList.remove('btn-start-hover');
    });
}
