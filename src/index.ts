#!/usr/bin/env node

import {AddProductHandler} from "./forManagingInventory/addProductHandler";
import {Inventory} from "./domain/inventory";
import {Storage} from "./forStoringData/storage";
import {GetProductInventoryHandler} from "./forManagingInventory/getProductInventoryHandler";
import {AddProductCommand} from "./forManagingInventory/addProductCommand";
import {GetProductInventory} from "./forManagingInventory/getProductInventory";

console.log('Hello, TypeScript!');

const inventory = new Inventory(new Storage())
const addProductHandler = new AddProductHandler(inventory);
const getProductInventoryHandler = new GetProductInventoryHandler(inventory)

const addShirt = new AddProductCommand('Camisa', 10);
const addMoreShirt = new AddProductCommand('Camisa', 50);

const getInventory = new GetProductInventory('Camisa')

addProductHandler.handle(addShirt)
addProductHandler.handle(addMoreShirt)
const result = getProductInventoryHandler.handle(getInventory)

console.log(`There are ${result} units of Camisa`)