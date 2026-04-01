import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { InventoryProvider } from './store/InventoryContext';
import AdminInventory from './pages/AdminInventory';
import AdminInventoryCreate from './pages/AdminInventoryCreate';
import AdminInventoryEdit from './pages/AdminInventoryEdit';
import AdminInventoryDetails from './pages/AdminInventoryDetails';

const Layout = ({ children }) => (
  <div className="min-h-screen bg-gray-100">
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600">Inventory Admin</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      {children}
    </main>
  </div>
);

function App() {
  return (
    <Router>
      <InventoryProvider>
        <Layout>
          <Routes>
            <Route path="/admin/inventory" element={<AdminInventory />} />
            <Route path="/admin/inventory/create" element={<AdminInventoryCreate />} />
            <Route path="/admin/inventory/:id" element={<AdminInventoryDetails />} />
            <Route path="/admin/inventory/:id/edit" element={<AdminInventoryEdit />} />
            <Route path="/" element={<Navigate to="/admin/inventory" replace />} />
          </Routes>
        </Layout>
      </InventoryProvider>
    </Router>
  );
}

export default App;
