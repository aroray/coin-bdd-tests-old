

module.exports = class Currency {
    constructor() {
        this.number;
        this.name;
        this.price;
        this.marketCap;
        this.volume;
    }

    get number() {
        return this.number;
    }

    set number(newNumber) {
        this.number = newNumber
    }

    get name() {
        return this.name;
    }

    set name(newName) {
        this.name = newName
    }

    get price() {
        return this.price;
    }

    set price(newPrice) {
        this.price = newPrice
    }

    get marketCap() {
        return this.marketCap;
    }

    set marketCap(newMarketCap) {
        this.marketCap = newMarketCap
    }

    get volume() {
        return this.volume;
    }

    set volume(newVolume) {
        this.volume = newVolume
    }
}
