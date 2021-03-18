import {CARD_SUIT_TO_IMG, CARD_VALUE_TO_IMG} from "./const";

let images = {};

//// import delle immagini con webpack
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

export function importImagesCard() {
    images = importAll(require.context('../assets/cards', false, /\.(png|jpe?g|svg)$/));
}
///////////////////////////



// match della carta (seme - valore) con l'immagine relativa
export function bindCard(card) {
    const suit = CARD_SUIT_TO_IMG[card.suit];
    const value = CARD_VALUE_TO_IMG[card.value];

    return images[`${value}_of_${suit}.svg`].default;
}


