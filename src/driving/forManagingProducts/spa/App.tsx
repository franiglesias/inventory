import React from 'react';
import {InMemoryProductStorage} from "../../../driven/forStoringProducts/InMemoryProductStorage";
import {ConfigurableIdentityProvider} from "../../../driven/forGettingIdentities/ConfigurableIdentityProvider";
import {InventoryConfigurator} from "../../../InventoryConfigurator";
import {Inventory} from "../../../inventory/Inventory";
import {InventoryProvider} from "./ForManagingProductsReactAdapter";
import {ProductManager} from "./ProductManager";
import {ProductIdentity} from "../../../inventory/ProductIdentity";


// Creamos una instancia del configurador para la aplicación web
const createAppConfigurator = () => {
    return InventoryConfigurator.run()
};

const App: React.FC = () => {
    const configurator = createAppConfigurator();

    return (
            <div className="app-container">
                <header className="app-header">
                    <h1>Sistema de Inventario</h1>
                </header>

                <main>
                    <InventoryProvider configurator={configurator}>
                        <ProductManager/>
                    </InventoryProvider>
                </main>

                <footer className="app-footer">
                    <p>&copy; 2025 Sistema de Inventario</p>
                </footer>

                <style>
                    {`
        .app-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: Arial, sans-serif;
        }

        .app-header {
          background-color: #2c3e50;
          color: white;
          padding: 1rem;
          text-align: center;
        }

        main {
          flex: 1;
          padding: 20px;
          background-color: #f9f9f9;
        }

        .app-footer {
          background-color: #2c3e50;
          color: white;
          text-align: center;
          padding: 1rem;
          font-size: 0.8rem;
        }
        `}
                </style>
            </div>
    );
};

export default App;
