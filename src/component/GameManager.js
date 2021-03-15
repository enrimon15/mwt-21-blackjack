import Deck from "./Deck";
import {setCenterFlexLayout, setStyle} from "../utility/setStyle";
import {createButton} from "./Button";
import {CARD_VALUE_TO_NUMBER} from "../utility/const";
import {bindCard, createCounterCard} from "../utility/CardUtility";
import loseImg from "../assets/gif/lose.gif";
import winImg from "../assets/gif/win.gif";

function GameManager() {
    const _this = this;

    let playerResult, dealerResult;
    let deck;

    let counterPlayerCard, counterDealerCard;

    let intervalDealer;
    
    let buttonStop, buttonHit;

    let reInit; 

    

    this.restore = function () {
        //ritorno alla situazione iniziale (carte girate)
        const contentGame = document.querySelector('#content-js');
        const parentNode = contentGame.parentNode;
        contentGame.remove();
        if (reInit) {
            console.log('reinit');
            let content = reInit();
            parentNode.appendChild(content);
        }
    };

    this.start = function () {
        // content del gioco
        const content = document.querySelector('#players-cards-content');

        // inizializzo i valori
        playerResult = 0;
        dealerResult = 0;

        // creo il deck di carte e lo mischio
        deck = new Deck();
        deck.shuffle();

        // creo i bottoni "pesca" e "fermati"
        content.appendChild(buildContentButtons());

        // giro le carte dealer
        hitNewCardFromDeck('dealer');

        // giro le carte player
        const playerCardSub = document.getElementById('card-player-0');
        const playerCardCount = createCounterCard('card-player-count');
        counterPlayerCard = document.createElement('p');
        playerCardCount.appendChild(counterPlayerCard);
        playerCardSub.parentNode.replaceChild(playerCardCount, playerCardSub);

        hitNewCardFromDeck('player');
    };

    // costruzione bottoni "pesca" e "fermati"
    function buildContentButtons() {
        const divContainerButton = document.createElement('div');
        divContainerButton.setAttribute('id', 'player-button-content');
        setCenterFlexLayout(divContainerButton);

        buttonHit = createButton('Pesca', '#3399ff', true);
        buttonHit.addEventListener('click', functionHitButt);

        buttonStop = createButton('Fermati', 'red');
        buttonStop.addEventListener('click', functionStopButt);

        divContainerButton.appendChild(buttonHit);
        divContainerButton.appendChild(buttonStop);

        return divContainerButton;
    }

    // pesca una nuova carta dal mazzo
    const hitNewCardFromDeck = function (playerType) {
        const newCard = deck.hitCard(); // pesco una carta
        let currentCard;
        
        if (playerType === 'player') {
            _this.setPlayerResult(CARD_VALUE_TO_NUMBER[newCard.value]);
            currentCard = document.querySelector('#card-player-1');
        } else if (playerType == 'dealer') {
            _this.setDealerResult(CARD_VALUE_TO_NUMBER[newCard.value]);
            currentCard = document.getElementById('card-dealer-1');
        } else if (playerType == 'dealerNew') {
            _this.setDealerResult(CARD_VALUE_TO_NUMBER[newCard.value]);
            currentCard = document.createElement('img');
            setStyle(currentCard, {
                height: '250px',
                marginLeft: '-110px',
            });
        } else {
            return;
        }

        currentCard.src = bindCard(newCard);
        return currentCard;
    }

    // event on PESCA button
    const functionHitButt = function (e) {
        hitNewCardFromDeck('player');
    }

    // event on FERMATI button
    const functionStopButt = function (e) {
        disableButton();

        const oldCard = document.querySelector('#card-dealer-0');

        const dealerCardCount = createCounterCard('card-dealer-count');
        counterDealerCard = document.createElement('p');
        counterDealerCard.setAttribute('id','text-dealer-count');
        dealerCardCount.appendChild(counterDealerCard);

        const deckDealer = oldCard.parentNode;
        deckDealer.replaceChild(dealerCardCount, oldCard);

        let goInterval = true;

        const hitCardDealer = () => {
           
            const newCard = hitNewCardFromDeck('dealerNew');
            setStyle(newCard, {
                height: '250px',
                marginLeft: '-110px',
            });

            deckDealer.appendChild(newCard);

            if ((parseInt(dealerResult) > playerResult) && (parseInt(dealerResult) <= 21)) {
                console.log('hai perso');
                goInterval = false;
                if (intervalDealer) clearInterval(intervalDealer);
                _this.endgame('lose');
            }     
        };

        hitCardDealer();
        if (goInterval) intervalDealer = setInterval(hitCardDealer, 3000);
    }

    const disableButton = () => {
        const newButtHit = createButton('Pesca', 'gray', true);
        newButtHit.classList.remove('btn-start-hover');
        const newButtStop = createButton('Fermati', 'gray');
        newButtStop.classList.remove('btn-start-hover');

        buttonHit.parentNode.replaceChild(newButtHit, buttonHit);
        buttonStop.parentNode.replaceChild(newButtStop, buttonStop);
    }

    // -- GETTER E SETTER DEALER RESULT
    this.getDealerResult = () => {
        return dealerResult;
    };

    this.setDealerResult = (newValue) => {
        dealerResult = parseInt(dealerResult) + parseInt(newValue); // aggiorno il punteggio del dealer

        // se il dealer ha iniziato a giocare aggiorno il display del totale
        if (counterDealerCard) {
            counterDealerCard.innerHTML = dealerResult;
            counterDealerCard.style.fontSize = '40px';
        }

        // se il dealer arriva a più di 21 punti (il player vince)
        if (parseInt(dealerResult) > 21) {
            if (intervalDealer) clearInterval(intervalDealer);
            console.log('hai vinto');
            counterDealerCard.style.color = 'red';
            _this.endgame('win');
        }
    };

    // -- GETTER E SETTER PLAYER RESULT
    this.getPlayerResult = () => {
        return playerResult;
    };

    this.setPlayerResult = (newValue) => {
        playerResult = parseInt(playerResult) + parseInt(newValue);

        if (counterPlayerCard) {
            counterPlayerCard.innerHTML = _this.getPlayerResult();
            counterPlayerCard.style.fontSize = '40px';
        }

        if (parseInt(playerResult) === 21) {
            console.log('hai vinto');
            _this.endgame('win');
        }

        if (parseInt(playerResult) > 21) {
            console.log('hai perso');
            counterPlayerCard.style.color = 'red';
            _this.endgame('lose');
        }
    };

    // -- END GAME --
    this.endgame = (loseOrWin) => {
        const el = document.querySelector('#blank-content');
        const lose = document.createElement('img');
        lose.setAttribute('id', 'img-lose');
        lose.src = loseOrWin === 'lose' ? loseImg : winImg;
        lose.style.height = '170px';
        el.appendChild(lose);

        const buttonContent = document.getElementById('player-button-content');
        buttonContent.remove();

        const startButton = document.querySelector('#start-button');
        startButton.childNodes[0].textContent = 'RIGIOCA';
    };


    // re-init function
    Object.defineProperty(this, 'reInit', {
        set: function(callback) {
            reInit = callback;
        },
    });

}

export default GameManager;
