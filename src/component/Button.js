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

    if (margin && margin === true) {
        setStyle(button, {
            marginRight: '10px'
        });
    }
    button.classList.add(...CLS_BUTTON);

    const spanTextButton = document.createElement('span');
    spanTextButton.innerHTML = text;
    button.appendChild(spanTextButton);

    return button;
}
