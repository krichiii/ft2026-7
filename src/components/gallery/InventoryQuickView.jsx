import React from 'react';
import { X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE_URL } from '../../services/inventoryApi';

const InventoryQuickView = ({ item, isOpen, onClose, isFavorite, onToggleFavorite }) => {
  if (!item) return null;

  const getImageUrl = (url) => {
    if (!url) return 'https://via.placeholder.com/600?text=No+Image';
    if (url.startsWith('http')) return url;
    return `${API_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  const imageUrl = getImageUrl(item.photo_url);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden relative flex flex-col md:flex-row max-h-[90vh]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full text-gray-500 hover:text-gray-800 hover:bg-white transition-all shadow-md"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center min-h-[300px]">
              <img
                src={imageUrl}
                alt={item.inventory_name}
                className="w-full h-full object-contain"
                onError={(e) => {
                  if (e.target.src !== 'https://via.placeholder.com/600?text=No+Image') {
                    e.target.src = 'https://via.placeholder.com/600?text=No+Image';
                  }
                }}
              />
            </div>

            <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-3xl font-bold text-gray-900 leading-tight">
                  {item.inventory_name}
                </h2>
                <button
                  onClick={() => onToggleFavorite(item)}
                  className={`p-3 rounded-xl transition-all ${
                    isFavorite 
                      ? 'bg-red-50 text-red-500' 
                      : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="space-y-6 flex-grow">
                <div>
                  <h3 className="text-sm font-uppercase tracking-wider text-gray-500 font-bold mb-2">
                    DESCRIPTION
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {item.description || 'No description available for this item.'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <span className="block text-xs text-gray-400 font-bold">ITEM ID</span>
                    <span className="text-gray-700">#{item.id}</span>
                  </div>
                  {/* Add more fields if available in your API */}
                </div>
              </div>

              <button
                onClick={onClose}
                className="mt-8 w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200"
              >
                Close Details
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default InventoryQuickView;
