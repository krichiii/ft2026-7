import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { InventoryProvider } from './store/InventoryContext';
import { FavoritesProvider } from './store/FavoritesContext';
import { LayoutGrid, Heart, Settings, Package } from 'lucide-react';

// Admin Pages
import AdminInventory from './pages/AdminInventory';
import AdminInventoryCreate from './pages/AdminInventoryCreate';
import AdminInventoryEdit from './pages/AdminInventoryEdit';
import AdminInventoryDetails from './pages/AdminInventoryDetails';

// User Pages
import Gallery from './pages/Gallery';
import Favorites from './pages/Favorites';

const NavLink = ({ to, icon: Icon, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
        isActive 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-bold tracking-tight">{children}</span>
    </Link>
  );
};

const Layout = ({ children }) => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/gallery" className="flex items-center space-x-3 group">
              <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200 transition-transform group-hover:scale-110">
                <Package className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black text-gray-900 tracking-tighter">
                INVEN<span className="text-blue-600">HUB</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <NavLink to="/gallery" icon={LayoutGrid}>Gallery</NavLink>
            <NavLink to="/favorites" icon={Heart}>Favorites</NavLink>
            <div className="w-px h-8 bg-gray-100 mx-2" />
            <NavLink to="/admin/inventory" icon={Settings}>Admin</NavLink>
          </div>

          {/* Mobile menu button could go here */}
        </div>
      </div>
    </nav>

    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full">
      {children}
    </main>

    <footer className="bg-white border-t border-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-400 text-sm font-medium">
          © 2026 InvenHub. Laboratory Work 8.
        </p>
        <div className="flex space-x-6 text-sm font-bold text-gray-400">
          <Link to="/gallery" className="hover:text-gray-900 transition-colors">GALLERY</Link>
          <Link to="/favorites" className="hover:text-gray-900 transition-colors">FAVORITES</Link>
          <Link to="/admin/inventory" className="hover:text-gray-900 transition-colors">ADMIN</Link>
        </div>
      </div>
    </footer>
  </div>
);

function App() {
  return (
    <Router>
      <InventoryProvider>
        <FavoritesProvider>
          <Layout>
            <Routes>
              {/* User Routes */}
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/favorites" element={<Favorites />} />
              
              {/* Admin Routes */}
              <Route path="/admin/inventory" element={<AdminInventory />} />
              <Route path="/admin/inventory/create" element={<AdminInventoryCreate />} />
              <Route path="/admin/inventory/:id" element={<AdminInventoryDetails />} />
              <Route path="/admin/inventory/:id/edit" element={<AdminInventoryEdit />} />
              
              {/* Default Route */}
              <Route path="/" element={<Navigate to="/gallery" replace />} />
            </Routes>
          </Layout>
        </FavoritesProvider>
      </InventoryProvider>
    </Router>
  );
}

export default App;
