import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';
import { useInventory } from '../store/InventoryContext';
import InventoryForm from '../components/inventory/InventoryForm';

const AdminInventoryEdit = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { fetchInventory } = useInventory();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await inventoryApi.getInventoryById(id);
        setItem(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch item');
      } finally {
        setIsFetching(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleSubmit = async (textData, photo) => {
    setIsLoading(true);
    setError(null);
    try {
      // 1. Update text
      await inventoryApi.updateInventoryText(id, textData);

      // 2. Update photo if provided
      if (photo) {
        const photoFormData = new FormData();
        photoFormData.append('photo', photo);
        await inventoryApi.updateInventoryPhoto(id, photoFormData);
      }

      await fetchInventory();
      navigate('/admin/inventory');
    } catch (err) {
      setError(err.message || 'Failed to update inventory item');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) return <div className="text-center p-10">Loading item...</div>;
  if (error && !item) return <div className="text-center p-10 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 text-center">Edit Item</h1>
      {error && <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>}
      <InventoryForm
        initialData={item}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        isEdit={true}
      />
    </div>
  );
};

export default AdminInventoryEdit;
