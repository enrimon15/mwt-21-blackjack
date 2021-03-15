import {SUITS, VALUES} from "../utility/const";
import Card from "./Card";


function Deck() {
    const _this = this;


    init();

    // devo passargli il contesto dell'oggetto non essendo arrow function
    function init() {
        let cards = [];

        SUITS.forEach(suit => {
            VALUES.forEach(value => {
                 cards.push(new Card(suit, value));
            });
        });

        _this.cards = cards;
    }

    // mischia il mazzo - arrow function prende il contesto dell'oggetto
    this.shuffle = () => {
        if (this.cards) {
            for (let i = 0; i < this.cards.length; i++) {
                const newIndex = Math.floor(Math.random() * (i + 1)); // ritorna un intero rendom tra 0 e i+1, floor arrotonda
                // faccio lo swap tra l'indice corrente e l'indice random
                const oldValue = this.cards[newIndex];
                this.cards[newIndex] = this.cards[i];
                this.cards[i] = oldValue;
            }
        }
    };

    // pesca una carta
    this.hitCard = () => {
        const cardHint = this.cards[Math.floor((Math.random() * this.cards.length))];

        const index = this.cards.indexOf(cardHint);
        this.cards.splice(index, 1);

        return cardHint;
    };

}

export default Deck;
