import React from 'react';
import { Heart } from 'lucide-react';
import { API_BASE_URL } from '../../services/inventoryApi';

const InventoryCard = ({ item, onQuickView, isFavorite, onToggleFavorite }) => {
  const getImageUrl = (url) => {
    if (!url) return 'https://via.placeholder.com/300?text=No+Image';
    if (url.startsWith('http')) return url;
    return `${API_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  const imageUrl = getImageUrl(item.photo_url);

  return (
    <div className="group relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full">
      <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
        <img
          src={imageUrl}
          alt={item.inventory_name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            if (e.target.src !== 'https://via.placeholder.com/300?text=No+Image') {
              e.target.src = 'https://via.placeholder.com/300?text=No+Image';
            }
          }}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(item);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 z-10 ${
            isFavorite 
              ? 'bg-red-500 text-white scale-110 shadow-lg' 
              : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 truncate mb-1">
          {item.inventory_name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 min-h-[2.5rem] flex-grow">
          {item.description || 'No description available'}
        </p>
        
        <button
          onClick={() => onQuickView(item)}
          className="mt-4 w-full py-2 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200"
        >
          Quick View
        </button>
      </div>
    </div>
  );
};

export default InventoryCard;
