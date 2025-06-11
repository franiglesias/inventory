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

- `npm run build`: Compile TypeScript files to JavaScript and bundle the application for production
- `npm run build:backend`: Compile TypeScript files to JavaScript without bundling (for individual file execution)
- `npm run test`: Run tests with Vitest
- `npm run lint`: Run Biome linter to check for code issues
- `npm run format`: Format code with Biome to maintain consistent style
- `npm run start`: Start the development server and open the application in a browser
- `npm run dev`: Same as `start` - starts the development server
- `npm run debug`: Start the development server with source maps enabled for debugging

## Development

The project uses:
- TypeScript for type-safe JavaScript
- Vitest for testing
- Biome for linting and formatting

Source code goes in `src/` directory and tests in `test/` directory.

## Architecture

This is a single-page application (SPA) with the following architecture:

- **Frontend**: React components in `src/components` and adapters in `src/adapters/react`
- **Business Logic**: Core domain logic in `src/inventory` implementing the hexagonal architecture pattern
- **Storage**: In-memory storage implementation in `src/driven/forStoringProducts`

There is no separate backend server in this application. All business logic runs in the browser, and data is stored in memory. When you run the application with `npm run start` or `npm run debug`, it starts a development server that serves the frontend application.

## Debugging

This project includes debug configurations for both VS Code and IntelliJ IDEA:

### VS Code

#### Frontend Debugging

1. Start the development server with source maps:
   ```bash
   npm run debug
   ```

2. In VS Code, press F5 or go to Run > Start Debugging
3. Select "Launch Chrome against localhost" from the debug configuration dropdown
4. Set breakpoints in your TypeScript files
5. The Chrome browser will open automatically and stop at your breakpoints

#### Individual File Debugging

1. Open any TypeScript file you want to debug (e.g., a business logic file from `src/inventory`)
2. In VS Code, press F5 or go to Run > Start Debugging
3. Select "Debug Current File" from the debug configuration dropdown
4. Set breakpoints in your TypeScript file
5. The debugger will stop at your breakpoints

Note: This is useful for debugging business logic files individually, without running the entire application.

### IntelliJ IDEA

#### Frontend Debugging

1. From the run configurations dropdown in the top-right corner, select "Start Server for Debug"
2. Click the debug button (or press Shift+F9)
3. Set breakpoints in your TypeScript files
4. The browser will open automatically and stop at your breakpoints

#### Individual File Debugging

1. Open any TypeScript file you want to debug (e.g., a business logic file from `src/inventory`)
2. From the run configurations dropdown, select "Debug Current File"
3. Click the debug button (or press Shift+F9)
4. Set breakpoints in your TypeScript file
5. The debugger will stop at your breakpoints

Note: This is useful for debugging business logic files individually, without running the entire application.

#### Running Tests

1. From the run configurations dropdown, select "Run Tests"
2. Click the run button (or press Shift+F10) to run tests
3. Click the debug button (or press Shift+F9) to debug tests
4. Set breakpoints in your test files to debug specific test cases

## Troubleshooting

### Verifying the Application is Running

When you run the application with `npm run start` or `npm run debug`, you should see:

1. A terminal output indicating that the webpack development server has started
2. A browser window should open automatically to http://localhost:3000
3. The application interface should be visible with the title "Sistema de Inventario"

If the browser doesn't open automatically, try manually navigating to http://localhost:3000.

### Debugging Issues

If you're having trouble with debugging:

1. Make sure source maps are enabled (they should be by default)
2. Verify that you're using the correct debug configuration for your task
3. For frontend debugging, ensure the webpack development server is running
4. For individual file debugging, make sure you've selected the correct file
5. Check the browser console (F12) for any JavaScript errors

#### Breakpoints Not Being Hit

If your breakpoints are not being hit when debugging the frontend:

1. Make sure you're using the `npm run debug` script, which enables source maps
2. Verify that the source maps are being generated correctly by checking the browser's developer tools
   - In Chrome, open Developer Tools (F12), go to Sources tab, and look for your source files under the webpack:// domain
3. The project has been configured with source map path overrides to help the debugger locate your source files:
   - VS Code: `webpack:///src/*`, `webpack://inventory/src/*`, etc.
   - IntelliJ IDEA: `webpack:///src`, `webpack://inventory/src`
4. If you're still having issues, try adding a `debugger;` statement in your code where you want to pause execution

Remember that this application doesn't have a separate backend server - all business logic runs in the browser.
