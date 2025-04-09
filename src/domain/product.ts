export class Product {
    private _name;
    private _inventory;


    constructor(name: string, inventory: number) {
        this._name = name;
        this._inventory = inventory;
    }


    get inventory() {
        return this._inventory;
    }

    name() {
        return this._name;
    }

    addUnits(quantity: number): Product {
        return new Product(this._name, this._inventory + quantity)
    }

    removeUnits(quantity: number): Product {
        return new Product(this._name, this._inventory - quantity)
    }
}