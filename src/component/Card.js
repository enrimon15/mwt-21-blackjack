function Card(suite, value) {
    const _this = this;

    init();

    function init() {
        _this.value = value;
        _this.suite = suite;
    }
}

export default Card;
