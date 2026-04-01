import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';
import { useInventory } from '../store/InventoryContext';
import InventoryForm from '../components/inventory/InventoryForm';

const AdminInventoryCreate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { fetchInventory } = useInventory();

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      await inventoryApi.createInventory(formData);
      await fetchInventory();
      navigate('/admin/inventory');
    } catch (err) {
      setError(err.message || 'Failed to create inventory item');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 text-center">Create New Item</h1>
      {error && <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>}
      <InventoryForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
};

export default AdminInventoryCreate;
