import Deck from "./Deck";
import {setStyle} from "../utility/setStyle";
import {createButton, disableButtons} from "./Button";
import {CARD_VALUE_TO_NUMBER} from "../utility/const";
import {bindCard} from "../utility/CardUtility";
import loseImg from "../assets/gif/lose.gif";
import winImg from "../assets/gif/win.gif";
import {createCounterCard} from "./Card";

function GameManager() {
    const _this = this;

    let playerResult, dealerResult, counterPlayerHit;
    let deck;

    let counterPlayerCard, counterDealerCard;
    
    let buttonStop, buttonHit;

    let deckDealer, deckPlayer;
    let buttonContent, resultGame;

    this.start = function () {

        // inizializzo i valori
        playerResult = 0;
        dealerResult = 0;
        counterPlayerHit = 0;

        // creo il deck di carte e lo mischio
        deck = new Deck();
        deck.shuffle();

        takeContentElements();

        // creo i bottoni "pesca" e "fermati"
        buildContentButtons();

        // giro le carte dealer
        hitNewCardFromDeck('dealer');

        // giro le carte player
        // 1 - creo la counter card e la sostituisco alla prima carta girata
        const playerCardCount = createCounterCard('card-player-count');
        counterPlayerCard = document.createElement('p');
        playerCardCount.appendChild(counterPlayerCard);
        deckPlayer.replaceChild(playerCardCount, deckPlayer.childNodes[0]);
        // 2 - pesco una carta
        hitNewCardFromDeck('player');
    };

    function takeContentElements() {
        buttonContent = document.getElementById('player-button-content');
        resultGame = document.getElementById('blank-content');
        deckPlayer = document.getElementById('deck-player');
        deckDealer = document.getElementById('deck-dealer');
    }

    // costruzione bottoni "pesca" e "fermati"
    function buildContentButtons() {
        const divContainerButton = buttonContent;

        buttonHit = createButton('Pesca', '#3399ff');
        buttonHit.style.marginRight = '10px';
        buttonHit.addEventListener('click', functionHitButt);

        buttonStop = createButton('Fermati', 'red');
        buttonStop.addEventListener('click', functionStopButt);

        divContainerButton.appendChild(buttonHit);
        divContainerButton.appendChild(buttonStop);

        return divContainerButton;
    }

    // pesca una nuova carta dal mazzo
    function hitNewCardFromDeck(playerType, dealerHit) {
        const newCard = deck.hitCard(); // pesco una carta
        let currentCard;
        
        if (playerType === 'player') {
            _this.setPlayerResult(CARD_VALUE_TO_NUMBER[newCard.value]);
            currentCard = dealerHit === true
                        ? document.createElement('img')
                        : deckPlayer.childNodes[1];
        } else if (playerType === 'dealer') {
            _this.setDealerResult(CARD_VALUE_TO_NUMBER[newCard.value]);
            currentCard = dealerHit === true
                        ? document.createElement('img')
                        : deckDealer.childNodes[1];
        } else {
            return;
        }

        currentCard.src = bindCard(newCard);
        return currentCard;
    }

    // event on PESCA button
    const functionHitButt = function (e) {
        ++counterPlayerHit;

        const newCard = hitNewCardFromDeck('player', true);
        setStyle(newCard, STYLE_OVERLAP_CARD); // sovrappongo le carte pescate

        deckPlayer.appendChild(newCard);


        if (parseInt(playerResult) === 21) { // il player fa blackjack
            _this.endgame('win');
        } else if (parseInt(playerResult) > 21) { // il player ha sforato, perde
            counterPlayerCard.style.color = 'red';
            _this.endgame('lose');
        }
    };

    // event on FERMATI button
    const functionStopButt = function (e) {
        let intervalDealer;
        if (counterPlayerHit < 1) {
            alert('Devi girare almeno una carta!');
            return;
        }

        // disabilito i bottoni "pesca" e "fermati"
        disableButtons(this.parentNode); // this è il bottone "fermati"

        // creo la counter card dealer e la sotituisco alla prima carta girata
        const dealerCardCount = createCounterCard('card-dealer-count');
        counterDealerCard = document.createElement('p');
        counterDealerCard.setAttribute('id','text-dealer-count');
        dealerCardCount.appendChild(counterDealerCard);

        deckDealer.replaceChild(dealerCardCount, deckDealer.childNodes[0]);

        // ----

        let goInterval = true;

        const hitCardDealer = () => {
           
            const newCard = hitNewCardFromDeck('dealer', true);
            setStyle(newCard, STYLE_OVERLAP_CARD); // sovrappongo le carte pescate

            deckDealer.appendChild(newCard);

            if (parseInt(dealerResult) > 21) { // se il dealer arriva a più di 21 punti (il player vince)
                if (intervalDealer) clearInterval(intervalDealer);
                console.log('hai vinto');
                counterDealerCard.style.color = 'red';
                _this.endgame('win');
            } else if (parseInt(dealerResult) > playerResult) { // se il dealer ha fatto meno di 21 punti e ha fatto + del player
                goInterval = false;
                if (intervalDealer) clearInterval(intervalDealer);
                _this.endgame('lose');
            }
        };

        hitCardDealer();
        if (goInterval) intervalDealer = setInterval(hitCardDealer, 3000);
    };

    // -- SETTER DEALER RESULT
    this.setDealerResult = (newValue) => {
        dealerResult = parseInt(dealerResult) + parseInt(newValue); // aggiorno il punteggio del dealer

        // se il dealer ha iniziato a giocare aggiorno il display del totale
        if (counterDealerCard) {
            counterDealerCard.innerHTML = dealerResult;
            counterDealerCard.style.fontSize = '40px';
        }
    };

    // -- SETTER PLAYER RESULT
    this.setPlayerResult = (newValue) => {
        playerResult = parseInt(playerResult) + parseInt(newValue);

        if (counterPlayerCard) {
            counterPlayerCard.innerHTML = playerResult;
            counterPlayerCard.style.fontSize = '40px';
        }
    };

    // -- END GAME --
    this.endgame = (loseOrWin) => {
        const el = resultGame;

        // creo la gif relativa al risultato
        const lose = document.createElement('img');
        lose.setAttribute('id', 'img-lose');
        lose.src = loseOrWin === 'lose' ? loseImg : winImg;
        lose.style.height = '170px';
        el.appendChild(lose);

        buttonHit.remove();
        buttonStop.remove();

        const startButton = document.querySelector('#start-button');
        startButton.childNodes[0].textContent = 'RIGIOCA';
    };
}

const STYLE_OVERLAP_CARD = {
    height: '250px',
    marginLeft: '-110px',
};

export default GameManager;
