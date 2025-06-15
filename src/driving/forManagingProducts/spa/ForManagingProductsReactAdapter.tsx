import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import {Result} from "../../../inventory/driving/Result";
import {InventoryConfigurator} from "../../../InventoryConfigurator";
import {AddProduct} from "../../../inventory/driving/forManagingProducts/addProduct/AddProduct";
import {GetCurrentStock} from "../../../inventory/driving/forManagingProducts/getCurrentStock/GetCurrentStock";
import {RestockProduct} from "../../../inventory/driving/forManagingProducts/restockProduct/RestockProduct";
import {ConsumeProduct} from "../../../inventory/driving/forManagingProducts/consumeProduct/ConsumeProduct";


// Interfaz para los estados de carga y error
interface OperationState {
  loading: boolean;
  error: Error | null;
}

// Interfaz del contexto que proporciona el adaptador
interface InventoryContextType {
  // Estados para las operaciones
  addProductState: OperationState;
  getCurrentStockState: OperationState;
  restockProductState: OperationState;
  consumeProductState: OperationState;

  // Métodos para interactuar con el inventario
  addProduct: (productName: string, initialQuantity: number) => Promise<Result<string>>;
  getCurrentStock: (productId: string) => Promise<Result<object>>;
  restockProduct: (productId: string, quantity: number) => Promise<Result<void>>;
  consumeProduct: (productId: string, quantity: number) => Promise<Result<void>>;

  // Método para reiniciar los estados de error
  clearErrors: () => void;
}

// Crear el contexto
const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

// Props para el proveedor del contexto
interface InventoryProviderProps {
  children: ReactNode;
  configurator: InventoryConfigurator;
}

// Componente proveedor que encapsula la funcionalidad del inventario
export const InventoryProvider: React.FC<InventoryProviderProps> = ({ children, configurator }) => {
  // Estados para las operaciones
  const [addProductState, setAddProductState] = useState<OperationState>({ loading: false, error: null });
  const [getCurrentStockState, setGetCurrentStockState] = useState<OperationState>({ loading: false, error: null });
  const [restockProductState, setRestockProductState] = useState<OperationState>({ loading: false, error: null });
  const [consumeProductState, setConsumeProductState] = useState<OperationState>({ loading: false, error: null });

  // Método para añadir un producto
  const addProduct = useCallback(
    async (productName: string, initialQuantity: number): Promise<Result<string>> => {
      setAddProductState({ loading: true, error: null });
      try {
        const command = new AddProduct(productName, initialQuantity);
        const handler = configurator.buildAddProductHandler();
        const result = handler.handle(command);
        setAddProductState({ loading: false, error: null });

        // Dispatch productAdded event if the operation was successful
        if (result.successful()) {
          const productId = result.unwrap();
          window.dispatchEvent(new CustomEvent('productAdded', { 
            detail: { productId } 
          }));
        }

        return result;
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        setAddProductState({ loading: false, error: err });
        throw err;
      }
    },
    [configurator]
  );

  // Método para obtener el stock actual de un producto
  const getCurrentStock = useCallback(
    async (productId: string): Promise<Result<object>> => {
      setGetCurrentStockState({ loading: true, error: null });
      try {
        const query = new GetCurrentStock(productId);
        const handler = configurator.buildGetCurrentStockHandler();
        const result = handler.handle(query);
        setGetCurrentStockState({ loading: false, error: null });
        return result;
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        setGetCurrentStockState({ loading: false, error: err });
        throw err;
      }
    },
    [configurator]
  );

  // Método para reabastecer un producto
  const restockProduct = useCallback(
    async (productId: string, quantity: number): Promise<Result<void>> => {
      setRestockProductState({ loading: true, error: null });
      try {
        const command = new RestockProduct(productId, quantity);
        const handler = configurator.buildRestockProductHandler();
        const result = handler.handle(command);
        setRestockProductState({ loading: false, error: null });

        // Dispatch productStockUpdated event if the operation was successful
        if (result.successful()) {
          window.dispatchEvent(new CustomEvent('productStockUpdated', { 
            detail: { productId } 
          }));
        }

        return result;
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        setRestockProductState({ loading: false, error: err });
        throw err;
      }
    },
    [configurator]
  );

  // Método para consumir un producto
  const consumeProduct = useCallback(
    async (productId: string, quantity: number): Promise<Result<void>> => {
      setConsumeProductState({ loading: true, error: null });
      try {
        const command = new ConsumeProduct(productId, quantity);
        const handler = configurator.buildConsumeProductHandler();
        const result = handler.handle(command);
        setConsumeProductState({ loading: false, error: null });

        // Dispatch productStockUpdated event if the operation was successful
        if (result.successful()) {
          window.dispatchEvent(new CustomEvent('productStockUpdated', { 
            detail: { productId } 
          }));
        }

        return result;
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        setConsumeProductState({ loading: false, error: err });
        throw err;
      }
    },
    [configurator]
  );

  // Método para limpiar todos los errores
  const clearErrors = useCallback(() => {
    setAddProductState(prev => ({ ...prev, error: null }));
    setGetCurrentStockState(prev => ({ ...prev, error: null }));
    setRestockProductState(prev => ({ ...prev, error: null }));
    setConsumeProductState(prev => ({ ...prev, error: null }));
  }, []);

  // Valor del contexto
  const value: InventoryContextType = {
    addProductState,
    getCurrentStockState,
    restockProductState,
    consumeProductState,
    addProduct,
    getCurrentStock,
    restockProduct,
    consumeProduct,
    clearErrors,
  };

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
};

// Hook personalizado para usar el contexto del inventario
export const useInventory = (): InventoryContextType => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory debe usarse dentro de un InventoryProvider');
  }
  return context;
};