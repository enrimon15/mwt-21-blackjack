import backCard from "../assets/cards/back.jpg";
import { bindCard } from "../utility/CardImageUtility";
import {setCenterFlexLayout, setStyle} from "../utility/setStyle";

export default function Card(suit, value) {
    const _this = this;

    init();

    function init() {
        _this.value = value;
        _this.suit = suit;

        _this.view = buildCardView();
    }

    function buildCardView() {
        const cardView = document.createElement('img');
        cardView.src = bindCard(_this);
        return cardView;
    }
}

// carta bianca con cantatore punteggio
export function createCounterCard(id) {
    const cardCount = document.createElement('div');
    cardCount.setAttribute('id', id);
    setStyle(cardCount, styles.STYLE_COUNTER_CARD);

    return cardCount;
}

// deck di due carte coperte
export function createBackDeckCard(cardType, number) {
    const cardsDiv = document.createElement('div');
    cardsDiv.setAttribute('id', `deck-${cardType}`);
    setCenterFlexLayout(cardsDiv);

    for (let i = 0; i<number; i++) {
        const backCard = buildBackCard(`card-${cardType}-${i}`);
        backCard.style.marginRight = i === 0 ? '30px' : '0px';
        cardsDiv.appendChild(backCard);
    }

    return cardsDiv;
}

// carta coperta singola
function buildBackCard(id) {
    const card = document.createElement('img');
    card.setAttribute('id', id); // assegno a ogni carta un'id
    card.style.height = '250px';
    card.src = backCard;

    return card;
}

const styles = {
    STYLE_COUNTER_CARD: {
        marginRight: '30px',
        border: '2px solid',
        borderRadius: '15px',
        backgroundColor: 'white',
        color: 'green',
        height: '250px',
        width: '160px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
};

