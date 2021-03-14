function Card(suit, value) {
    const _this = this;

    init();

    function init() {
        _this.value = value;
        _this.suit = suit;
    }
}

export default Card;
