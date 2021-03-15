import {setStyle} from "./setStyle";
import backCard from "../assets/cards/back.jpg";
import {CARD_SUIT_TO_IMG, CARD_VALUE_TO_IMG} from "./const";

let images = {};

/** import delle immagini con webpack */
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

export function importImagesCard() {
    images = importAll(require.context('../assets/cards', false, /\.(png|jpe?g|svg)$/));
}
/*********/


// deck di due carte girate
export function createBackDeckCard(cardType) {
    let deck = [];

    for (let i = 0; i<2; i++) {
        const initCard = document.createElement('img');
        initCard.setAttribute('id', `card-${cardType}-${i}`); // assegno a ogni carta un'id
        const margin = i === 0 ? '30px' : '0px';
        setStyle(initCard, {
            height: '250px',
            marginRight: margin,
        });
        initCard.src = backCard;

        deck.push(initCard);
    }

    return deck;
}

// match della carta (seme - valore) con l'immagine relativa
export function bindCard(card) {
    const suit = CARD_SUIT_TO_IMG[card.suit];
    const value = CARD_VALUE_TO_IMG[card.value];

    return images[`${value}_of_${suit}.svg`].default;
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
