import {initAbsolute, setStyle} from "../utility/setStyle";
import OptionBar from "./OptionBar";
import Content from "./Content";
import {importImagesCard} from "../utility/CardUtility";
import GameManager from "./GameManager";

function Game() {

    setStyle(document.body, {
        position: 'relative',
        width: '100vw',
        height: '100vh',
        margin: 0,
        fontFamily: 'Montserrat, sans-serif',
        backgroundColor: '#66A182'
    });

    importImagesCard(); // importo le immagini delle carte

    const appContainer = document.createElement('main');
    initAbsolute(appContainer, ['top', 'bottom', 'left', 'right']);

    const optionBar = new OptionBar();
    appContainer.appendChild(optionBar.element);

    const content = new Content();
    appContainer.appendChild(content.element);

    const gameManager = new GameManager();

    optionBar.handleStart = gameManager.start;
    optionBar.handleStop = gameManager.restore;

    document.body.appendChild(appContainer);

}

export default Game;
