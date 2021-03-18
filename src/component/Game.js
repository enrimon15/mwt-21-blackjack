import {initAbsolute, setStyle} from "../utility/setStyle";
import OptionBar from "./OptionBar";
import Content from "./Content";
import {importImagesCard} from "../utility/CardUtility";
import GameManager from "./GameManager";

function Game() {
    // importo le immagini svg delle carte
    importImagesCard();

    // imposto lo stile del body
    setStyle(document.body, STYLE_BODY);

    // finestra principale
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

    // assegno il comportamento al bottone della option bar
    optionBar.handleStart = gameManager.start;
    optionBar.handleStop = content.restore;

    document.body.appendChild(appContainer);
}

const STYLE_BODY = {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    margin: 0,
    fontFamily: 'Montserrat, sans-serif',
    backgroundColor: '#66A182'
};

export default Game;
