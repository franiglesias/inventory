import React, { useState, useEffect } from 'react';
import { useInventory } from './ForManagingProductsReactAdapter';

// Interfaz para los datos de productos
interface ProductData {
  id: string;
  name: string;
  stock: number;
}

export const ProductManager: React.FC = () => {
  // Estado para los productos y el formulario
  const [products, setProducts] = useState<ProductData[]>([]);
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Obtener las funciones del adaptador
  const {
    addProduct,
    getCurrentStock,
    restockProduct,
    consumeProduct,
    addProductState,
    getCurrentStockState,
    restockProductState,
    consumeProductState,
  } = useInventory();

  // Función para añadir un producto
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim()) {
      alert('El nombre del producto es obligatorio');
      return;
    }

    try {
      const result = await addProduct(productName, quantity);
      if (result.successful()) {
        const productId = result.unwrap();
        setProductName('');
        setQuantity(1);
        // Actualizar la lista de productos
        setRefreshTrigger(prev => prev + 1);
        alert(`Producto "${productName}" añadido con éxito`);
      } else {
        alert(`Error: ${result.error().message}`);
      }
    } catch (error) {
      console.error('Error al añadir producto:', error);
      alert(`Error inesperado: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  // Función para reabastecer un producto
  const handleRestockProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductId) {
      alert('Selecciona un producto');
      return;
    }

    try {
      const result = await restockProduct(selectedProductId, quantity);
      if (result.successful()) {
        setQuantity(1);
        // Actualizar la lista de productos
        setRefreshTrigger(prev => prev + 1);
        alert('Producto reabastecido correctamente');
      } else {
        alert(`Error: ${result.error().message}`);
      }
    } catch (error) {
      console.error('Error al reabastecer producto:', error);
      alert(`Error inesperado: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  // Función para consumir un producto
  const handleConsumeProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductId) {
      alert('Selecciona un producto');
      return;
    }

    try {
      const result = await consumeProduct(selectedProductId, quantity);
      if (result.successful()) {
        setQuantity(1);
        // Actualizar la lista de productos
        setRefreshTrigger(prev => prev + 1);
        alert('Producto consumido correctamente');
      } else {
        alert(`Error: ${result.error().message}`);
      }
    } catch (error) {
      console.error('Error al consumir producto:', error);
      alert(`Error inesperado: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  // Cargar los productos cuando cambie el refresh trigger
  useEffect(() => {
    // Esta función simula la carga de productos desde el backend
    // En una aplicación real, deberías implementar un método para listar todos los productos
    const loadProducts = async () => {
      try {
        // Por ahora, vamos a usar el localStorage para simular un almacén persistente de IDs
        const storedProductIds = JSON.parse(localStorage.getItem('productIds') || '[]');

        const productsData: ProductData[] = [];

        // Obtener información de cada producto
        for (const productId of storedProductIds) {
          try {
            const stockResult = await getCurrentStock(productId);
            if (stockResult.successful()) {
              const data = stockResult.unwrap() as any;
              productsData.push({
                id: productId,
                name: data.name || `Producto ${productId.substring(0, 8)}`,
                stock: data.stock || 0
              });
            }
          } catch (err) {
            console.error(`Error al cargar producto ${productId}:`, err);
          }
        }

        setProducts(productsData);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };

    loadProducts();
  }, [refreshTrigger, getCurrentStock]);

  // Guardar productId en localStorage cuando se añade un nuevo producto
  useEffect(() => {
    const handleProductAdded = (productId: string) => {
      const storedProductIds = JSON.parse(localStorage.getItem('productIds') || '[]');
      if (!storedProductIds.includes(productId)) {
        storedProductIds.push(productId);
        localStorage.setItem('productIds', JSON.stringify(storedProductIds));
      }
    };

    // Suscriptor personalizado (esto es un ejemplo, en una app real usarías un sistema de eventos)
    window.addEventListener('productAdded', (e: any) => handleProductAdded(e.detail.productId));

    return () => {
      window.removeEventListener('productAdded', (e: any) => handleProductAdded(e.detail.productId));
    };
  }, []);

  // Actualizar la lista de productos cuando se actualiza el stock
  useEffect(() => {
    const handleProductStockUpdated = (e: any) => {
      // Actualizar la lista de productos cuando cambia el stock
      setRefreshTrigger(prev => prev + 1);
    };

    // Suscriptor para actualizaciones de stock
    window.addEventListener('productStockUpdated', handleProductStockUpdated);

    return () => {
      window.removeEventListener('productStockUpdated', handleProductStockUpdated);
    };
  }, []);

  // Estado de carga general
  const isLoading = addProductState.loading ||
                    getCurrentStockState.loading ||
                    restockProductState.loading ||
                    consumeProductState.loading;

  return (
    <div className="product-manager">
      <h2>Gestor de Inventario</h2>

      {isLoading && <div className="loading-overlay">Procesando...</div>}

      <div className="product-form-container">
        <div className="form-section">
          <h3>Añadir Nuevo Producto</h3>
          <form onSubmit={handleAddProduct}>
            <div className="form-group">
              <label htmlFor="productName">Nombre del Producto:</label>
              <input
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="addQuantity">Cantidad Inicial:</label>
              <input
                type="number"
                id="addQuantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                required
              />
            </div>

            <button type="submit" disabled={isLoading}>
              Añadir Producto
            </button>
          </form>
        </div>

        <div className="form-section">
          <h3>Gestionar Producto Existente</h3>

          <div className="form-group">
            <label htmlFor="productSelect">Seleccionar Producto:</label>
            <select
              id="productSelect"
              value={selectedProductId || ''}
              onChange={(e) => setSelectedProductId(e.target.value || null)}
            >
              <option value="">-- Seleccione un producto --</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} (Stock: {product.stock})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="manageQuantity">Cantidad:</label>
            <input
              type="number"
              id="manageQuantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              required
            />
          </div>

          <div className="button-group">
            <button
              onClick={handleRestockProduct}
              disabled={!selectedProductId || isLoading}
            >
              Reabastecer
            </button>

            <button
              onClick={handleConsumeProduct}
              disabled={!selectedProductId || isLoading}
            >
              Consumir
            </button>
          </div>
        </div>
      </div>

      <div className="products-list">
        <h3>Lista de Productos</h3>
        {products.length === 0 ? (
          <p>No hay productos en el inventario</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id.substring(0, 8)}...</td>
                  <td>{product.name}</td>
                  <td>{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <style>
        {`
        .product-manager {
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          z-index: 1000;
        }

        .product-form-container {
          display: flex;
          gap: 20px;
          margin-bottom: 30px;
        }

        .form-section {
          flex: 1;
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 15px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }

        input, select {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        button {
          background-color: #4CAF50;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 4px;
          cursor: pointer;
          margin-right: 10px;
        }

        button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }

        .button-group {
          display: flex;
          gap: 10px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }

        th {
          background-color: #f2f2f2;
        }
        `}
      </style>
    </div>
  );
};