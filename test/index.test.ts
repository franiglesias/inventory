import {beforeEach, describe, expect, it} from 'vitest';
import {GetProductInventory} from "../src/forManagingInventory/getProductInventory";
import {GetProductInventoryHandler} from "../src/forManagingInventory/getProductInventoryHandler";
import {AddProductCommand} from "../src/forManagingInventory/addProductCommand";
import {AddProductHandler} from "../src/forManagingInventory/addProductHandler";
import {Inventory} from "../src/domain/inventory";
import {RemoveProductCommand} from "../src/forManagingInventory/removeProductCommand";
import {RemoveProductHandler} from "../src/forManagingInventory/removeProductHandler";
import {Storage} from "../src/forStoringData/storage";

describe('Inventory System', () => {
  let inventory: Inventory
  let addProductHandler: AddProductHandler
  let getProductHandler: GetProductInventoryHandler

  function expectInventory(productName: string, expectedInventory: number) {
    const query = new GetProductInventory(productName)
    const inventory = getProductHandler.handle(query)
    expect(inventory).toEqual(expectedInventory)
  }

  beforeEach(() => {
    inventory = new Inventory(new Storage())
    addProductHandler = new AddProductHandler(inventory)
    getProductHandler = new GetProductInventoryHandler(inventory)
  });


  it('Should get the inventory of a non existent product', () =>{
    expectInventory('Camisa', 0);
  })

  it('Should add units of a product ', () => {
    addProductHandler.handle(new AddProductCommand('Camisa', 30))
    expectInventory('Camisa', 30);
  });

  it('Should increase units of an existing product ', () => {
    addProductHandler.handle(new AddProductCommand('Camisa', 30))
    addProductHandler.handle(new AddProductCommand('Camisa', 20))
    expectInventory('Camisa', 50);
  });

  it('should decrease units of an existing product', () => {
    addProductHandler.handle(new AddProductCommand('Camisa', 50))

    const removeHandler = new RemoveProductHandler(inventory)

    removeHandler.handler(new RemoveProductCommand('Camisa', 40))
    expectInventory('Camisa', 10)
  });
});
