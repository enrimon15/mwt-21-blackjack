import Deck from "./Deck";
import {setStyle} from "../utility/setStyle";
import {createButton} from "./Button";
import {CARD_VALUE_TO_NUMBER} from "../utility/const";
import {bindCard, createCounterCard} from "../utility/CardUtility";
import loseImg from "../assets/gif/lose.gif";
import winImg from "../assets/gif/win.gif";

function GameManager() {
    const _this = this;

    let playerResult, dealerResult, counterPlayerHit;
    let deck;

    let counterPlayerCard, counterDealerCard;

    let intervalDealer;
    
    let buttonStop, buttonHit;

    this.start = function () {

        // inizializzo i valori
        playerResult = 0;
        dealerResult = 0;
        counterPlayerHit = 0;

        // creo il deck di carte e lo mischio
        deck = new Deck();
        deck.shuffle();

        // creo i bottoni "pesca" e "fermati"
        buildContentButtons();

        // giro le carte dealer
        hitNewCardFromDeck('dealer');

        // giro le carte player
        // 1 - creo la counter card e la sostituisco alla prima carta girata
        const playerCardSub = document.getElementById('card-player-0');
        const playerCardCount = createCounterCard('card-player-count');
        counterPlayerCard = document.createElement('p');
        playerCardCount.appendChild(counterPlayerCard);
        playerCardSub.parentNode.replaceChild(playerCardCount, playerCardSub);
        // 2 - pesco una carta
        hitNewCardFromDeck('player');
    };

    // costruzione bottoni "pesca" e "fermati"
    function buildContentButtons() {
        const divContainerButton = document.querySelector('#player-button-content');

        buttonHit = createButton('Pesca', '#3399ff', true);
        buttonHit.addEventListener('click', functionHitButt);

        buttonStop = createButton('Fermati', 'red');
        buttonStop.addEventListener('click', functionStopButt);

        console.log('a')

        divContainerButton.appendChild(buttonHit);
        divContainerButton.appendChild(buttonStop);

        console.log('b')

        return divContainerButton;
    }

    // pesca una nuova carta dal mazzo
    function hitNewCardFromDeck(playerType, dealerHit) {
        const newCard = deck.hitCard(); // pesco una carta
        let currentCard;
        
        if (playerType === 'player') {
            _this.setPlayerResult(CARD_VALUE_TO_NUMBER[newCard.value]);
            currentCard = document.querySelector('#card-player-1');
        } else if (playerType === 'dealer') {
            _this.setDealerResult(CARD_VALUE_TO_NUMBER[newCard.value]);
            currentCard = dealerHit === true
                        ? document.createElement('img')
                        : document.getElementById('card-dealer-1');
        } else {
            return;
        }

        currentCard.src = bindCard(newCard);
        return currentCard;
    }

    // event on PESCA button
    const functionHitButt = function (e) {
        ++counterPlayerHit;

        hitNewCardFromDeck('player');

        if (parseInt(playerResult) === 21) { // il player blackjack
            _this.endgame('win');
        } else if (parseInt(playerResult) > 21) { // il player ha sforato, perde
            counterPlayerCard.style.color = 'red';
            _this.endgame('lose');
        }
    };

    // event on FERMATI button
    const functionStopButt = function (e) {
        if (counterPlayerHit < 1) {
            alert('Devi pescare almeno una carta!');
            return;
        }

        // disabilito i bottoni "pesca" e "fermati"
        disableButton();

        // creo la counter card dealer e la sotituisco alla prima carta girata
        const oldCard = document.querySelector('#card-dealer-0');
        const dealerCardCount = createCounterCard('card-dealer-count');
        counterDealerCard = document.createElement('p');
        counterDealerCard.setAttribute('id','text-dealer-count');
        dealerCardCount.appendChild(counterDealerCard);

        const deckDealer = oldCard.parentNode;
        deckDealer.replaceChild(dealerCardCount, oldCard);

        // ----

        let goInterval = true;

        const hitCardDealer = () => {
           
            const newCard = hitNewCardFromDeck('dealer', true);
            setStyle(newCard, { // sovrappongo le carte pescate
                height: '250px',
                marginLeft: '-110px',
            });

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

    // disabilitare i pulsanti per continuare a giocare
    function disableButton() {
        const newButtHit = createButton('Pesca', 'gray', true);
        newButtHit.classList.remove('btn-start-hover');
        const newButtStop = createButton('Fermati', 'gray');
        newButtStop.classList.remove('btn-start-hover');

        buttonHit.parentNode.replaceChild(newButtHit, buttonHit);
        buttonStop.parentNode.replaceChild(newButtStop, buttonStop);

        buttonHit = newButtHit;
        buttonStop = newButtStop;
    }

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
        const el = document.querySelector('#blank-content');

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

export default GameManager;
