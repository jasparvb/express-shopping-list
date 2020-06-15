
const items = require("./fakeDb")

class Item {
    constructor(name, price) {
        this.name = name;
        this.price = price;
        items.push(item);
    }

    getItems() {
        return items
    }

    getItem(name) {
        let item = items.find(i => i.name === name);
        if(item === undefined){
            throw new Error("Item not found", 404);
        }
        return item;
    }

    updateItem(name, newItem) {
        let item = items.find(i => i.name === name);
        if(items.name === undefined){
            throw new Error("Item not found", 404);
        }
        item.name = newItem.name;
        item.price = newItem.price;
        return item;
    }

    deleteItem(name) {
        let idx = items.findIndex(i => i.name === name);
        if(items.name === -1){
            throw new Error("Item not found", 404);
        }
        items.splice(idx, 1);
    }
}

module.exports = Item;