import {initAbsolute, setCenterFlexLayout, setStyle} from "../utility/setStyle";
import {createButton} from "./Button";

function OptionBar() {
    const _this = this;
    init();

    let handleStart, handleStop;

    function init() {
        const el = document.createElement('div');

        if (el) {

            el.setAttribute('id', 'option-bar');
            initAbsolute(el, ['top', 'right', 'left']);
            setStyle(el, {
                height: '25%',
                display: 'grid',
                gridTemplateColumns: '1fr',
                gridTemplateRows: '1fr 1fr',
            });

            // -- Testo --
            const divContainerText = document.createElement('div');
            setCenterFlexLayout(divContainerText);

            const infoText = document.createElement('p');
            infoText.innerHTML = 'PREMI START PER GIOCARE!';
            setStyle(infoText, {
                fontSize: 'xx-large'
            });
            divContainerText.appendChild(infoText);

            el.appendChild(divContainerText);

            // -- Bottone --
            const divContainerButton = document.createElement('div');
            divContainerButton.setAttribute('id','start-button');
            setCenterFlexLayout(divContainerButton);
            const buttonStart = createButton('START');


            //  -- Comportamento bottone --
            const handleClickStop = () => {
                buttonStart.removeEventListener('click', handleClickStop);
                buttonStart.innerHTML = 'START';
                if (handleStop) {
                    handleStop();
                }
                buttonStart.addEventListener('click', handleClickStart);
            };

            const handleClickStart = () => {
                buttonStart.removeEventListener('click', handleClickStart);
                buttonStart.innerHTML = 'STOP';
                if (handleStart) {
                    handleStart();
                }
                buttonStart.addEventListener('click', handleClickStop);
            };

            buttonStart.addEventListener('click', handleClickStart);

            //------

            divContainerButton.appendChild(buttonStart);
            el.appendChild(divContainerButton);
        }

        _this.element = el;
    }

    // -- GETTER E SETTER
    Object.defineProperty(this, 'handleStart', {
        set: function(callback) {
            handleStart = callback;
        },
    });
    Object.defineProperty(this, 'handleStop', {
        set: function(callback) {
            handleStop = callback;
        },
    });
}

export default OptionBar;
