import {initAbsolute, setStyle} from "../utility/setStyle";
import Deck from "./Deck";
import OptionBar from "./OptionBar";
import Content from "./content";

function Game() {

    init();

    function init() {
        setStyle(document.body, {
            position: 'relative',
            width: '100vw',
            height: '100vh',
            margin: 0,
            fontFamily: 'Montserrat, sans-serif',
            backgroundColor: '#66A182'
        });

        const appContainer = document.createElement('main');

        initAbsolute(appContainer, ['top', 'bottom', 'left', 'right']);

        const optionBar = new OptionBar();
        appContainer.appendChild(optionBar.element);

        const content = new Content();
        appContainer.appendChild(content.element);

        document.body.appendChild(appContainer);
    }
}

export default Game;
