import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { inventoryApi } from '../services/inventoryApi';

const InventoryContext = createContext();

export const useInventory = () => useContext(InventoryContext);

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInventory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await inventoryApi.getInventory();
      setInventory(response.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch inventory');
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteInventoryItem = async (id) => {
    try {
      await inventoryApi.deleteInventory(id);
      setInventory((prev) => prev.filter((item) => item.id !== id));
      return true;
    } catch (err) {
      setError(err.message || 'Failed to delete inventory item');
      return false;
    }
  };

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  const value = {
    inventory,
    loading,
    error,
    fetchInventory,
    deleteInventoryItem,
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};
