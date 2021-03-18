import Deck from "./Deck";
import {initAbsolute, setCenterFlexLayout, setStyle} from "../utility/setStyle";
import {createButton, disableButtons} from "./Button";
import {CARD_VALUE_TO_NUMBER} from "../utility/const";
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

        console.log(deck);

        getContentElements();

        // creo i bottoni "pesca" e "fermati"
        buildContentButtons();

        // giro le carte dealer
        const newCardDealer = turnCard('dealer');
        _this.setDealerResult(CARD_VALUE_TO_NUMBER[newCardDealer.value]);

        // giro le carte player
        const newCardPlayer = turnCard('player');
         // creo la counter card player e la sostituisco alla prima carta coperta
        const playerCardCount = createCounterCard('card-player-count');
        counterPlayerCard = document.createElement('p');
        playerCardCount.appendChild(counterPlayerCard);
        deckPlayer.replaceChild(playerCardCount, deckPlayer.childNodes[0]);

        _this.setPlayerResult(CARD_VALUE_TO_NUMBER[newCardPlayer.value]);
    };

    function getContentElements() {
        buttonContent = document.getElementById('player-button-content');
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
    }

    function turnCard(playerType) {
        const newCard = deck.hitCard(); // pesco una carta
        let currentCard;

        switch (playerType) {
            case 'player':
                currentCard = deckPlayer.childNodes[1];
                break;
            case 'dealer':
                currentCard = deckDealer.childNodes[1];
                break;
            default:
                console.log("player type " + expr + " non valido");
                return;
          }

          currentCard.src = newCard.view.src;
          return newCard;
    }

    // event on PESCA button
    const functionHitButt = function (e) {
        ++counterPlayerHit;

        const newCard = deck.hitCard();
        setStyle(newCard.view, STYLE_OVERLAP_CARD); // sovrappongo le carte pescate
        deckPlayer.appendChild(newCard.view);
        _this.setPlayerResult(CARD_VALUE_TO_NUMBER[newCard.value]);


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
        disableButtons(this.parentNode); // this è il bottone "fermati", parentNode è il divContainer dei bottoni

        // creo la counter card dealer e la sotituisco alla prima carta girata
        const dealerCardCount = createCounterCard('card-dealer-count');
        counterDealerCard = document.createElement('p');
        counterDealerCard.setAttribute('id','text-dealer-count');
        dealerCardCount.appendChild(counterDealerCard);

        deckDealer.replaceChild(dealerCardCount, deckDealer.childNodes[0]);

        // ----

        let goInterval = true;

        const hitCardDealer = () => {
           
            const newCard = deck.hitCard();
            setStyle(newCard.view, STYLE_OVERLAP_CARD); // sovrappongo le carte pescate
            deckDealer.appendChild(newCard.view);
            _this.setDealerResult(CARD_VALUE_TO_NUMBER[newCard.value]);

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

        const containerResult = document.createElement('div');
        initAbsolute(containerResult, ['left','bottom','right']);
        setCenterFlexLayout(containerResult);

        const result = document.createElement('img');
        result.setAttribute('id', 'img-result');
        result.src = loseOrWin === 'lose' ? loseImg : winImg;
        result.style.height = '170px';
        containerResult.appendChild(result);

        buttonHit.remove();
        buttonStop.remove();

        const contentGame = buttonContent.parentNode;
        contentGame.appendChild(containerResult);

        const startButton = document.getElementById('start-button');
        startButton.childNodes[0].textContent = 'RIGIOCA';
    };
}

const STYLE_OVERLAP_CARD = {
    height: '250px',
    marginLeft: '-110px',
};

export default GameManager;
