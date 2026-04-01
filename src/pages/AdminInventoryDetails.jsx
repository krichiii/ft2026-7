import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';
import InventoryDetails from '../components/inventory/InventoryDetails';

const AdminInventoryDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await inventoryApi.getInventoryById(id);
        setItem(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch item details');
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  if (loading) return <div className="text-center p-10">Loading item details...</div>;
  if (error) return <div className="text-center p-10 text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Link to="/admin/inventory" className="text-blue-600 hover:underline">← Back to List</Link>
        <Link
          to={`/admin/inventory/${id}/edit`}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
        >
          Edit This Item
        </Link>
      </div>
      <InventoryDetails item={item} />
    </div>
  );
};

export default AdminInventoryDetails;
