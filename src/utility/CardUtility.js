import {setStyle} from "./setStyle";
import backCard from "../assets/cards/back.jpg";
import {CARD_SUIT_TO_IMG, CARD_VALUE_TO_IMG} from "./const";

let images = {};


function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

export function importImagesCard() {
    images = importAll(require.context('../assets/cards', false, /\.(png|jpe?g|svg)$/));
}




export function createBackDeckCard(cardType) {
    let deck = [];

    for (let i = 0; i<2; i++) {
        const initCard = document.createElement('img');
        initCard.setAttribute('id', `card-${cardType}-${i}`);
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

export function bindCard(card) {
    const suit = CARD_SUIT_TO_IMG[card.suit];
    const value = CARD_VALUE_TO_IMG[card.value];

    return images[`${value}_of_${suit}.svg`].default;
}
