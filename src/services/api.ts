
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000'
});

export const NotasService = {
  async getAll() {
    const response = await api.get('/notas');
    return response.data;
  },

  async create(nota: any) {
    const response = await api.post('/notas', nota);
    return response.data;
  },

  async update(id: string, nota: any) {
    const response = await api.put(`/notas/${id}`, nota);
    return response.data;
  },

  async delete(id: string) {
    const response = await api.delete(`/notas/${id}`);
    return response.data;
  }
};
