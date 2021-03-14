import {initAbsolute, setCenterFlexLayout, setStyle} from "../utility/setStyle";
import Deck from "./Deck";
import ContentHeader from "./ContentHeader";
import {bindCard, createBackDeckCard} from "../utility/CardUtility";
import {createButton} from "./Button";
import {CARD_VALUE_TO_NUMBER} from "../utility/const";
import loseImg from "../assets/gif/lose.gif";
import winImg from "../assets/gif/win.gif";

function Content() {
    const _this = this;
    init();

    let dealerResult;
    let playerResult;

    let deck = [];

    function init() {

        const el = document.createElement('div');

        if (el) {

            el.setAttribute('id', 'content-js');
            initAbsolute(el, ['bottom', 'right', 'left']);
            setStyle(el, {
                top: '25%',
                backgroundColor: '#66A182'
            });

            // -- Header info --
            const contentHeader = new ContentHeader();
            el.appendChild(contentHeader.element);

            // -- Content Cards --
            const divPlayersCards = document.createElement('div');
            divPlayersCards.setAttribute('id', 'players-cards-content');
            initAbsolute(divPlayersCards, ['bottom', 'right', 'left']);
            setStyle(divPlayersCards, {
                top: '20%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows: '1fr 1fr',

            });

            // creo le carte girate dealer e player
            const playersDeck = ['dealer', 'player'];
            playersDeck.forEach(pd => {
                const backDeckCards = createBackDeckCard(pd);

                const cardsDiv = document.createElement('div');
                cardsDiv.setAttribute('id', `deck-${pd}`);
                setCenterFlexLayout(cardsDiv);
                backDeckCards.forEach(card => cardsDiv.appendChild(card));

                divPlayersCards.appendChild(cardsDiv);
            });

            const blank = document.createElement('div');
            setCenterFlexLayout(blank);
            blank.setAttribute('id','blank-content');
            divPlayersCards.appendChild(blank);


            el.appendChild(divPlayersCards);
        }

        _this.element = el;
    }

    /*this.start = function () {
        // inizializzo i valori
        playerResult = 0;
        dealerResult = 0;

        // creo il deck di carte, lo mischio
        deck = new Deck();
        deck.shuffle();

        // creo i bottoni
        const playerContent = document.querySelector('#players-cards-content');

        const blank = document.createElement('div');
        setCenterFlexLayout(blank);
        blank.setAttribute('id','blank-content');
        playerContent.appendChild(blank);

        const divContainerButton = document.createElement('div');
        divContainerButton.setAttribute('id', 'player-button-content');
        setCenterFlexLayout(divContainerButton);

        const buttonHint = createButton('Pesca', '#3399ff', true);
        buttonHint.addEventListener('click', function (e) {
            const newCard = deck.hintCard();
            _this.setPlayerResult(CARD_VALUE_TO_NUMBER[newCard.value]);
            const oldCard = document.querySelector('#card-player-1');
            oldCard.src = bindCard(newCard);
        });
        const buttonStop = createButton('Fermati', 'red');
        divContainerButton.appendChild(buttonHint);
        divContainerButton.appendChild(buttonStop);

        playerContent.appendChild(divContainerButton);

        // giro le carte dealer
        const cardShownDealer = deck.hintCard(); // pesco una carta
        const dealerCard = document.getElementById('card-dealer-1');
        dealerCard.src = bindCard(cardShownDealer);
        _this.setDealerResult(CARD_VALUE_TO_NUMBER[cardShownDealer.value]);

        // giro le carte player
        const playerCardSub = document.getElementById('card-player-0');
        const playerCardCount = document.createElement('div');
        playerCardCount.setAttribute('id', 'card-player-count');
        setStyle(playerCardCount, {
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
        const textCount = document.createElement('p');
        textCount.setAttribute('id','text-player-count');
        playerCardCount.appendChild(textCount);

        const deckPlayer = document.querySelector('#deck-player');
        deckPlayer.replaceChild(playerCardCount, playerCardSub);

        const cardShownPlayer = deck.hintCard(); // pesco una carta
        const playerCard = document.getElementById('card-player-1');
        playerCard.src = bindCard(cardShownPlayer);
        _this.setPlayerResult(CARD_VALUE_TO_NUMBER[cardShownPlayer.value]);

        console.log(deck);
    };


    this.destroy = function () {
        // elimino i bottoni e ritorno alla situazione iniziale (carte girate)
        const playerContent = document.querySelector('#players-cards-content');
        const buttonContent = document.getElementById('player-button-content');
        const blankContent = document.getElementById('blank-content');
        playerContent.removeChild(buttonContent);
        playerContent.removeChild(blankContent);
    };

    this.endgame = (loseOrWin) => {
        const el = document.querySelector('#blank-content');
        const lose = document.createElement('img');
        lose.setAttribute('id', 'img-lose');
        lose.src = loseOrWin == 'lose' ? loseImg : winImg;
        lose.style.height = '170px';
        el.appendChild(lose);

        const buttonContent = document.getElementById('player-button-content');
        buttonContent.remove();

        const startButton = document.querySelector('#start-button');
        startButton.childNodes[0].textContent = 'RIGIOCA';
    };


    // -- GETTER E SETTER DEALER RESULT

    this.getDealerResult = () => {
        return dealerResult;
    };

    this.setDealerResult = (newValue) => {
        dealerResult += newValue;
        return dealerResult;
    };

    // -- GETTER E SETTER PLAYER RESULT

    this.getPlayerResult = () => {
        return playerResult;
    };

    this.setPlayerResult = (newValue) => {
        console.log(parseInt(newValue), parseInt(playerResult));
        playerResult = parseInt(playerResult) + parseInt(newValue);

        const cardCount = document.querySelector('#card-player-count');
        if (cardCount) {
            cardCount.innerHTML = _this.getPlayerResult();
            cardCount.style.fontSize = '40px';
        }

        if (parseInt(playerResult) === 21) {
            console.log('vinto');
            _this.endgame('win');
        }

        if (parseInt(playerResult) > 21) {
            console.log('perso');
            _this.endgame('lose');
        }

        return playerResult;
    };*/
}

export default Content;
