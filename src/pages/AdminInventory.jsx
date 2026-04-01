import React from 'react';
import { Link } from 'react-router-dom';
import InventoryTable from '../components/inventory/InventoryTable';

const AdminInventory = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
        <Link
          to="/admin/inventory/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add New Item
        </Link>
      </div>
      <InventoryTable />
    </div>
  );
};

export default AdminInventory;
