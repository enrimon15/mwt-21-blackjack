import Deck from "./Deck";
import {initAbsolute, setCenterFlexLayout, setStyle} from "../utility/setStyle";
import {createButton, disableButtons} from "./Button";
import {CARD_VALUE_TO_NUMBER} from "../utility/const";
import loseImg from "../assets/gif/lose.gif";
import winImg from "../assets/gif/win.gif";
import {createCounterCard} from "./Card";

function GameManager() {
    const _this = this; // contesto

    let playerResult, dealerResult, counterPlayerHit;

    let deck;

    let counterPlayerCard, counterDealerCard;
    
    let buttonContent;

    let deckDealer, deckPlayer;

    this.start = function () {

        // inizializzo i valori
        playerResult = 0;
        dealerResult = 0;
        counterPlayerHit = 0;

        // creo il deck di carte e lo mischio
        deck = new Deck();
        deck.shuffle();

        // recupero gli elementi tramite id
        getContentElements();

        // creo i bottoni "pesca" e "fermati"
        buildContentButtons();

        // giro le carte dealer
        const newCardDealer = turnCard('dealer');
        setDealerResult(CARD_VALUE_TO_NUMBER[newCardDealer.value]);

        // giro le carte player
        const newCardPlayer = turnCard('player');
         // creo la counter card player e la sostituisco alla prima carta coperta
        const playerCardCount = createCounterCard('card-player-count');
        counterPlayerCard = document.createElement('p');
        playerCardCount.appendChild(counterPlayerCard);
        deckPlayer.replaceChild(playerCardCount, deckPlayer.childNodes[0]);

        setPlayerResult(CARD_VALUE_TO_NUMBER[newCardPlayer.value]);
    };

    // prendo tramite id i contenuti che mi servono
    function getContentElements() {
        buttonContent = document.getElementById('player-button-content'); // div dei bottoni
        deckPlayer = document.getElementById('deck-player'); // deck player
        deckDealer = document.getElementById('deck-dealer'); // deck dealer
    }

    // costruzione bottoni "pesca" e "fermati"
    function buildContentButtons() {
        const buttonHit = createButton('Pesca', '#3399ff');
        buttonHit.style.marginRight = '10px';
        buttonHit.addEventListener('click', functionHitButt);

        const buttonStop = createButton('Fermati', 'red');
        buttonStop.addEventListener('click', functionStopButt);

        buttonContent.appendChild(buttonHit);
        buttonContent.appendChild(buttonStop);
    }

    // event on PESCA button
    function functionHitButt(e) {
        ++counterPlayerHit;

        const newCard = deck.hitCard();
        setStyle(newCard.view, styles.STYLE_OVERLAP_CARD); // sovrappongo le carte pescate
        deckPlayer.appendChild(newCard.view);
        setPlayerResult(CARD_VALUE_TO_NUMBER[newCard.value]);


        if (playerResult === 21) { // il player fa blackjack
            endgame('win');
        } else if (playerResult > 21) { // il player ha sforato, perde
            counterPlayerCard.style.color = 'red';
            endgame('lose');
        }
    }

    // event on FERMATI button
    function functionStopButt(e) {
        // il player deve girare almeno una carta
        if (counterPlayerHit < 1) {
            alert('Devi girare almeno una carta!');
            return;
        }

        // disabilito i bottoni "pesca" e "fermati"
        // this è il bottone "fermati", parentNode è il divContainer dei bottoni - potevo usare anche "buttonContent"
        disableButtons(this.parentNode, [functionHitButt, functionStopButt]);

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
            setStyle(newCard.view, styles.STYLE_OVERLAP_CARD); // sovrappongo le carte pescate
            deckDealer.appendChild(newCard.view);
            setDealerResult(CARD_VALUE_TO_NUMBER[newCard.value]);

            if (dealerResult > 21) { // se il dealer arriva a più di 21 punti (il player vince)
                goInterval = false;
                if (window.intervalDealer) clearInterval(intervalDealer);
                counterDealerCard.style.color = 'red';
                endgame('win');
            } else if (dealerResult > playerResult) { // se il dealer ha fatto meno o uguale di 21 punti e ha fatto + del player (il player perde)
                goInterval = false;
                if (window.intervalDealer) clearInterval(intervalDealer);
                endgame('lose');
            }
        };

        hitCardDealer();
        if (goInterval) {
            window.intervalDealer = setInterval(hitCardDealer, 3000);
        }
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
                console.log("player type " + playerType + " non valido");
                return;
          }

          currentCard.src = newCard.view.src;
          return newCard;
    }

    // -- SETTER DEALER RESULT
    function setDealerResult(newValue) {
        dealerResult = dealerResult + newValue; // aggiorno il punteggio del dealer

        // se il dealer ha iniziato a giocare aggiorno il display del totale
        if (counterDealerCard) {
            counterDealerCard.innerHTML = dealerResult;
            counterDealerCard.style.fontSize = '40px';
        }
    }

    // -- SETTER PLAYER RESULT
    function setPlayerResult(newValue) {
        playerResult = playerResult + newValue;

        if (counterPlayerCard) {
            counterPlayerCard.innerHTML = playerResult;
            counterPlayerCard.style.fontSize = '40px';
        }
    }

    // -- END GAME --
    function endgame(loseOrWin) {

        const containerResult = document.createElement('div');
        initAbsolute(containerResult, ['left','bottom','right']);
        setCenterFlexLayout(containerResult);

        const result = document.createElement('img');
        result.setAttribute('id', 'img-result');
        result.src = loseOrWin === 'lose' ? loseImg : winImg;
        result.style.height = '170px';
        containerResult.appendChild(result);

        while (buttonContent.firstChild) {
            buttonContent.removeChild(buttonContent.firstChild);
        }

        const contentGame = buttonContent.parentNode;
        contentGame.appendChild(containerResult);

        const startButton = document.getElementById('start-button');
        startButton.childNodes[0].textContent = 'RIGIOCA';
    }
}

const styles = {
    STYLE_OVERLAP_CARD: {
        height: '250px',
        marginLeft: '-110px'
    }
};

export default GameManager;
