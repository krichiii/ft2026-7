import React from 'react';
import { useInventory } from '../store/InventoryContext';
import InventoryGallery from '../components/gallery/InventoryGallery';

const Gallery = () => {
  const { inventory, loading, error } = useInventory();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Inventory Gallery
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Explore our collection of high-quality equipment and tools.
          </p>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>{inventory.length} items available</span>
        </div>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
          <p className="font-bold">Error loading inventory</p>
          <p className="text-sm">{error}</p>
        </div>
      ) : (
        <InventoryGallery items={inventory} loading={loading} />
      )}
    </div>
  );
};

export default Gallery;
