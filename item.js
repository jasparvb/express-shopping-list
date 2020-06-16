
const items = require("./fakeDb")

class Item {
    constructor(name, price) {
        this.name = name;
        this.price = price;
        items.push(this);
    }

    static getItems() {
        return items
    }

    static getItem(name) {
        let item = items.find(i => i.name === name);
        if(item === undefined){
            throw {message: "Not Found", status: 404}
        }
        return item;
    }

    static updateItem(name, newItem) {
        let item = items.find(i => i.name === name);
        if(item === undefined){
            throw {message: "Not Found", status: 404}
        }
        item.name = newItem.name;
        item.price = newItem.price;
        return item;
    }

    static deleteItem(name) {
        let idx = items.findIndex(i => i.name === name);
        if(idx === -1){
            throw {message: "Not Found", status: 404}
        }
        items.splice(idx, 1);
    }
}

module.exports = Item;