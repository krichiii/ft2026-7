import axios from 'axios';

export const API_BASE_URL = 'http://localhost:5000'; // Default backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const inventoryApi = {
  getInventory: () => api.get('/inventory'),
  getInventoryById: (id) => api.get(`/inventory/${id}`),
  createInventory: (formData) => api.post('/register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  updateInventoryText: (id, data) => api.put(`/inventory/${id}`, data),
  updateInventoryPhoto: (id, formData) => api.put(`/inventory/${id}/photo`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  deleteInventory: (id) => api.delete(`/inventory/${id}`),
};

export default api;
