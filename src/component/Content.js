import {initAbsolute, setCenterFlexLayout, setStyle} from "../utility/setStyle";
import ContentHeader from "./ContentHeader";
import {createBackDeckCard} from "../utility/CardUtility";

function Content() {
    const _this = this;
    init();

    function init() {

        const el = document.createElement('div');

        if (el) {

            el.setAttribute('id', 'content-js');
            initAbsolute(el, ['bottom', 'right', 'left']);
            setStyle(el, {
                top: '25%',
                backgroundColor: '#66A182'
            });

            // -- Header info --
            const contentHeader = new ContentHeader();
            el.appendChild(contentHeader.element);

            // -- Content Cards --
            const divPlayersCards = document.createElement('div');
            divPlayersCards.setAttribute('id', 'players-cards-content');
            initAbsolute(divPlayersCards, ['bottom', 'right', 'left']);
            setStyle(divPlayersCards, {
                top: '20%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows: '1fr 1fr',

            });

            // creo le carte girate: dealer e player
            const playersDeck = ['dealer', 'player'];
            playersDeck.forEach(pd => {
                const backDeckCards = createBackDeckCard(pd);

                const cardsDiv = document.createElement('div');
                cardsDiv.setAttribute('id', `deck-${pd}`);
                setCenterFlexLayout(cardsDiv);
                backDeckCards.forEach(card => cardsDiv.appendChild(card));

                divPlayersCards.appendChild(cardsDiv);
            });

            const blank = document.createElement('div');
            setCenterFlexLayout(blank);
            blank.setAttribute('id','blank-content');
            divPlayersCards.appendChild(blank);


            el.appendChild(divPlayersCards);
        }

        _this.element = el;
    }
}

export default Content;
