import {initAbsolute, setCenterFlexLayout, setStyle} from "../utility/setStyle";
import ContentHeader from "./ContentHeader";
import {createBackDeckCard} from "./Card";


function Content() {
    const _this = this; // contesto
    let contentDeck;

    initStructure();

    function initStructure() {
        const el = document.createElement('div');

        if (el) {

            // -- Style
            el.setAttribute('id', 'content-js');
            initAbsolute(el, ['bottom', 'right', 'left']);
            setStyle(el, styles.STYLE_CONTENT);

            // -- Header info player --
            const contentHeader = new ContentHeader();
            el.appendChild(contentHeader.element);

            // -- Content Cards --
            contentDeck = document.createElement('div');
            contentDeck.setAttribute('id', 'players-cards-content');
            initAbsolute(contentDeck, ['bottom', 'right', 'left']);
            setStyle(contentDeck, styles.STYLE_CONTENT_DECK);
            el.appendChild(contentDeck);

            initContent();
        }

        _this.element = el;
    }

    function initContent() {
        // creo il deck con le carte girate: dealer e player
        const playersDeck = ['dealer', 'player'];
        playersDeck.forEach(playerType => {
            const backDeckCards = createBackDeckCard(playerType, 2);
            contentDeck.appendChild(backDeckCards);
        });

        const blank = document.createElement('div');
        blank.setAttribute('id','blank-content');
        contentDeck.appendChild(blank);

        const divContainerButton = document.createElement('div');
        divContainerButton.setAttribute('id', 'player-button-content');
        setCenterFlexLayout(divContainerButton);
        contentDeck.appendChild(divContainerButton);
    }

    // funzione che re-inizializza il gioco
    _this.restore = () => {
        // elimino tutti i contenuti del content
        while (contentDeck.firstChild) {
            contentDeck.removeChild(contentDeck.firstChild);
        }
        // reinizializzo il content
        initContent();
    }
}

const styles = {
    STYLE_CONTENT: {
        top: '25%',
        backgroundColor: '#66A182'
    },
    STYLE_CONTENT_DECK: {
        top: '20%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
    
    }
};

export default Content;
