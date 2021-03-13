import {initAbsolute, setStyle} from "../utility/setStyle";

function OptionBar() {
    const _this = this;
    init();

    function init() {
        const el = document.createElement('div');
        el.setAttribute('id', 'optionbar');

        initAbsolute(el, ['top', 'right', 'left']);
        setStyle(el, {
            height: '25%'
        });

        if (el) {
            setStyle(el, {
                display: 'grid',
                gridTemplateColumns: '1fr',
                gridTemplateRows: '1fr 1fr',
            });

            const divContainerText = document.createElement('div');
            setStyle(divContainerText, {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            });

            const infoText = document.createElement('p');
            infoText.innerHTML = 'PREMI START PER GIOCARE!';
            setStyle(infoText, {
                fontSize: 'xx-large'
            });
            divContainerText.appendChild(infoText);


            const divContainerButton = document.createElement('div');
            setStyle(divContainerButton, {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            });

            const buttonStart = document.createElement('div');
            setStyle(buttonStart, {
                padding: '15px 50px'
            });
            const cls = ["btn", "btn-start"];
            buttonStart.classList.add(...cls);

            const spanTextButton = document.createElement('span');
            spanTextButton.innerHTML = 'START';
            buttonStart.appendChild(spanTextButton);

            buttonStart.addEventListener('click', function(e) {
                console.log('ciao');
            });

            divContainerButton.appendChild(buttonStart);

            el.appendChild(divContainerText);
            el.appendChild(divContainerButton);
        }

        _this.element = el;
    }
}

export default OptionBar;
