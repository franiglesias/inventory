# Inventory

This is a Typescript project to illustrate TDD classicist outside-in.

## Challenge

Write a little application to manage a simple inventory system:

* User can add products in any quantity to increase stock
* User can consume products in any quantity providing there is enough stock to satisfy the need. If no enough stock application should throw an error.
* Get current stock of a given product. If it doesn't exist, throw an error. If it is out of stock, throw an error.
* Get the history of the inventory changes for a given product
* Get the history of all the products
* Get a list of all the products and their stock level, and an indication of those near end or out of stock
* Get a list of products that are near end of stock

## Prerequisites

- Node.js (version 18 or higher recommended)
- npm (version 8 or higher recommended)

## Installation

```bash
npm install
```

## Available Commands

- `npm run build`: Compile TypeScript files to JavaScript
- `npm run test`: Run tests with Vitest
- `npm run lint`: Run Biome linter
- `npm run format`: Format code with Biome
- `npm run start`: Run the app through src/index.ts

## Development

The project uses:
- TypeScript for type-safe JavaScript
- Vitest for testing
- Biome for linting and formatting

Source code goes in `src/` directory and tests in `test/` directory.
