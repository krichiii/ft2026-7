import React from 'react';
import { API_BASE_URL } from '../../services/inventoryApi';

const InventoryDetails = ({ item }) => {
  if (!item) return <div className="text-center p-10">Item not found.</div>;

  const getImageUrl = (url) => {
    if (!url) return 'https://via.placeholder.com/300?text=No+Image';
    if (url.startsWith('http')) return url;
    return `${API_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-64 w-full object-cover md:w-64"
            src={getImageUrl(item.photo_url)}
            alt={item.inventory_name}
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Inventory ID: {item.id}</div>
          <h1 className="block mt-1 text-2xl leading-tight font-bold text-black">{item.inventory_name}</h1>
          <p className="mt-4 text-gray-500 text-lg leading-relaxed whitespace-pre-wrap">{item.description}</p>
        </div>
      </div>
    </div>
  );
};

export default InventoryDetails;
