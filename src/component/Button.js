import {setStyle} from "../utility/setStyle";
import {CLS_BUTTON} from "../utility/const";

export function createButton(text, color, margin) {
    const button = document.createElement('div');
    setStyle(button, {
        padding: '15px 50px'
    });

    if (color) {
        setStyle(button, {
            backgroundColor: color
        });
    }

    // nel caso in cui metto due bottoni affiancati
    if (margin && margin === true) {
        setStyle(button, {
            marginRight: '10px'
        });
    }
    
    // aggiungo le classi css
    button.classList.add(...CLS_BUTTON);

    // teso del bottone
    const spanTextButton = document.createElement('span');
    spanTextButton.innerHTML = text;
    button.appendChild(spanTextButton);

    return button;
}
