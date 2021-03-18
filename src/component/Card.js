import backCard from "../assets/cards/back.jpg";
import {CARD_SUIT_TO_IMG, CARD_VALUE_TO_IMG} from "../utility/const";
import {setStyle} from "../utility/setStyle";

export default function Card(suit, value) {
    const _this = this;

    init();

    function init() {
        _this.value = value;
        _this.suit = suit;
    }
}

export function createCounterCard(id) {
    const cardCount = document.createElement('div');
    cardCount.setAttribute('id', id);
    setStyle(cardCount, {
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
    });

    return cardCount;
}

// deck di due carte girate
export function createBackDeckCard(cardType, number) {
    let deck = [];

    for (let i = 0; i<number; i++) {
        const backCard = buildBackCard(`card-${cardType}-${i}`);
        const margin = i === 0 ? '30px' : '0px';
        backCard.style.marginRight = margin;
        deck.push(backCard);
    }

    return deck;
}

function buildBackCard(id) {
    const card = document.createElement('img');
    card.setAttribute('id', id); // assegno a ogni carta un'id
    card.style.height = '250px';
    card.src = backCard;

    return card;
}
