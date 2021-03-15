import {initAbsolute, setStyle} from "../utility/setStyle";
import OptionBar from "./OptionBar";
import Content from "./Content";
import {importImagesCard} from "../utility/CardUtility";
import GameManager from "./GameManager";

function Game() {

    // imposto lo stile del body
    setStyle(document.body, {
        position: 'relative',
        width: '100vw',
        height: '100vh',
        margin: 0,
        fontFamily: 'Montserrat, sans-serif',
        backgroundColor: '#66A182'
    });

    importImagesCard(); // importo le immagini svg delle carte

    // main window
    const appContainer = document.createElement('main');
    initAbsolute(appContainer, ['top', 'bottom', 'left', 'right']);

    // barra in alto
    const optionBar = new OptionBar();
    appContainer.appendChild(optionBar.element);

    // contenuto del gioco
    const content = new Content();
    appContainer.appendChild(content.element);

    // gestore del gioco
    const gameManager = new GameManager();
    gameManager.reInit = content.init;

    // assegno il comportamento al bottone della option bar
    optionBar.handleStart = gameManager.start;
    optionBar.handleStop = gameManager.restore;

    document.body.appendChild(appContainer);
}

export default Game;
