import {initAbsolute, setCenterFlexLayout, setStyle} from "../utility/setStyle";
import ContentHeader from "./ContentHeader";
import {createBackDeckCard} from "./Card";
import GameManager from "./GameManager";


function Content() {
    const _this = this;
    let contentDeck;

    initStructure();

    function initStructure() {
        const el = document.createElement('div');

        if (el) {

            // -- Style
            el.setAttribute('id', 'content-js');
            initAbsolute(el, ['bottom', 'right', 'left']);
            setStyle(el, STYLE_CONTENT);

            // -- Header info player --
            const contentHeader = new ContentHeader();
            el.appendChild(contentHeader.element);

            // -- Content Cards --
            contentDeck = document.createElement('div');
            contentDeck.setAttribute('id', 'players-cards-content');
            initAbsolute(contentDeck, ['bottom', 'right', 'left']);
            setStyle(contentDeck, STYLE_CONTENT_DECK);
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

            const cardsDiv = document.createElement('div');
            cardsDiv.setAttribute('id', `deck-${playerType}`);
            setCenterFlexLayout(cardsDiv);
            backDeckCards.forEach(card => cardsDiv.appendChild(card));

            contentDeck.appendChild(cardsDiv);
        });

        const blank = document.createElement('div');
        setCenterFlexLayout(blank);
        blank.setAttribute('id','blank-content');
        contentDeck.appendChild(blank);

        const divContainerButton = document.createElement('div');
        divContainerButton.setAttribute('id', 'player-button-content');
        setCenterFlexLayout(divContainerButton);
        contentDeck.appendChild(divContainerButton);
    }

    // reinizializzo il gioco
    _this.restore = () => {
        // elimino tutti i contenuti del content
        while (contentDeck.firstChild) {
            contentDeck.removeChild(contentDeck.firstChild);
        }
        // reinizializzo il content
        initContent();
    }
}

const STYLE_CONTENT = {
    top: '25%',
    backgroundColor: '#66A182'
};

const STYLE_CONTENT_DECK = {
    top: '20%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr',

};

export default Content;
