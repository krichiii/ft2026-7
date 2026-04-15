import React from 'react';
import { useFavorites } from '../hooks/useFavorites';
import InventoryGallery from '../components/gallery/InventoryGallery';
import { Heart } from 'lucide-react';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center space-x-3">
          <Heart className="w-10 h-10 text-red-500 fill-current" />
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            My Favorites
          </h1>
        </div>
        <p className="mt-2 text-lg text-gray-600">
          Your personal collection of items you love.
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
          <div className="text-gray-300 mb-4">
            <Heart className="mx-auto h-20 w-20" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Your collection is empty</h3>
          <p className="mt-2 text-gray-500 max-w-sm mx-auto">
            Click the heart icon on any item in the gallery to save it here for later.
          </p>
          <a
            href="/gallery"
            className="mt-8 inline-block px-8 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-red-100"
          >
            Explore Gallery
          </a>
        </div>
      ) : (
        <InventoryGallery items={favorites} loading={false} />
      )}
    </div>
  );
};

export default Favorites;
