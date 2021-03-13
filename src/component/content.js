import {initAbsolute, setStyle} from "../utility/setStyle";
import backCard from "../assets/cards/back.jpg";
import Deck from "./Deck";

function Content() {
    const _this = this;
    init();

    function init() {

        const el = document.createElement('div');
        el.setAttribute('id', 'content');

        initAbsolute(el, ['bottom', 'right', 'left']);
        setStyle(el, {
            top: '25%',
            backgroundColor: '#66A182'
        });

        if (el) {

            const divPlayers = document.createElement('div');
            divPlayers.setAttribute('id', 'player-content');
            initAbsolute(divPlayers, ['top', 'right', 'left']);
            setStyle(divPlayers, {
                height: '20%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows: '1fr',

            });

            const dealerText = document.createElement('div');
            setStyle(dealerText, {
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
            });
            dealerText.innerHTML = 'Dealer';

            const playerText = document.createElement('div');
            setStyle(playerText, {
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
            });
            playerText.innerHTML = 'Player';

            divPlayers.appendChild(dealerText);
            divPlayers.appendChild(playerText);




            const divPlayersCards = document.createElement('div');
            initAbsolute(divPlayersCards, ['bottom', 'right', 'left']);
            setStyle(divPlayersCards, {
                top: '20%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows: '1fr 1fr',

            });

            const cardDealer = document.createElement('div');
            setStyle(cardDealer, {
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
            });

            const cardD1 = document.createElement('img');
            setStyle(cardD1, {
                height: '250px',
                marginRight: '30px',
            });
            cardD1.src = backCard;

            const cardD2 = document.createElement('img');
            cardD2.height = 250;
            cardD2.src = backCard;

            cardDealer.appendChild(cardD1);
            cardDealer.appendChild(cardD2);




            const cardPlayer = document.createElement('div');
            setStyle(cardPlayer, {
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
            });

            const cardP1 = document.createElement('img');
            setStyle(cardP1, {
                height: '250px',
                marginRight: '30px',
            });
            cardP1.src = backCard;

            const cardP2 = document.createElement('img');
            cardP2.height = 250;
            cardP2.src = backCard;

            cardPlayer.appendChild(cardP1);
            cardPlayer.appendChild(cardP2);


            divPlayersCards.appendChild(cardDealer);
            divPlayersCards.appendChild(cardPlayer);
            //divPlayersCards.appendChild(blank);
            //divPlayersCards.appendChild(divContainerButton);


            el.appendChild(divPlayers);
            el.appendChild(divPlayersCards);
        }

        _this.element = el;
    }

    this.start = function () {
        const deck = new Deck();
        deck.shuffle();
        console.log(deck.cards);

        const playerContent = document.querySelector('#player-content');

        const divContainerButton = document.createElement('div');
        setStyle(divContainerButton, {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        });

        const blank = document.createElement('div');

        const cls = ["btn", "btn-start"];
        const buttonHint = document.createElement('div');
        setStyle(buttonHint, {
            padding: '15px 50px',
            marginRight: '10px',
            backgroundColor: '#3399ff'
        });
        buttonHint.classList.add(...cls);

        const spanTextButton1 = document.createElement('span');
        spanTextButton1.innerHTML = 'Pesca';
        buttonHint.appendChild(spanTextButton1);

        const buttonStop = document.createElement('div');
        setStyle(buttonStop, {
            padding: '15px 50px',
            backgroundColor: 'red'
        });
        buttonStop.classList.add(...cls);

        const spanTextButton2 = document.createElement('span');
        spanTextButton2.innerHTML = 'Stop';
        buttonStop.appendChild(spanTextButton2);

        divContainerButton.appendChild(buttonHint);
        divContainerButton.appendChild(buttonStop);

        playerContent.appendChild(blank);
        playerContent.appendChild(divContainerButton);

    };


    this.destroy = function () {

    };
}

export default Content;
