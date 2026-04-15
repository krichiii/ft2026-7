import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInventory } from '../../store/InventoryContext';
import ConfirmModal from './ConfirmModal';
import { API_BASE_URL } from '../../services/inventoryApi';

const InventoryTable = () => {
  const { inventory, loading, error, deleteInventoryItem } = useInventory();
  const [deleteId, setDeleteId] = useState(null);

  const getImageUrl = (url) => {
    if (!url) return 'https://via.placeholder.com/50?text=No+Image';
    if (url.startsWith('http')) return url;
    return `${API_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = async () => {
    if (deleteId) {
      await deleteInventoryItem(deleteId);
      setDeleteId(null);
    }
  };

  if (loading) return <div className="text-center p-10">Loading inventory...</div>;
  if (error) return <div className="text-center p-10 text-red-500">Error: {error}</div>;
  if (inventory.length === 0) return <div className="text-center p-10">No inventory found.</div>;

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {inventory.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  src={getImageUrl(item.photo_url)}
                  alt={item.inventory_name}
                  className="w-12 h-12 object-cover rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-medium">{item.inventory_name}</td>
              <td className="px-6 py-4 truncate max-w-xs">{item.description}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                <Link to={`/admin/inventory/${item.id}`} className="text-blue-600 hover:text-blue-900">View</Link>
                <Link to={`/admin/inventory/${item.id}/edit`} className="text-yellow-600 hover:text-yellow-900">Edit</Link>
                <button
                  onClick={() => handleDeleteClick(item.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Inventory"
        message="Are you sure you want to delete this item? This action cannot be undone."
      />
    </div>
  );
};

export default InventoryTable;
