
import axios from 'axios';
import type { NotaFiscal } from "../types/NotaFiscal";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000'
});

export const NotasService = {
  async getAll() {
    const response = await api.get<NotaFiscal[]>('/notas');
    return response.data;
  },

  async create(nota: NotaFiscal) {
    const response = await api.post<NotaFiscal>('/notas', nota);
    return response.data;
  },

  async update(id: string, nota: NotaFiscal) {
    const response = await api.put<NotaFiscal>(`/notas/${id}`, nota);
    return response.data;
  },

  async delete(id: string) {
    const response = await api.delete(`/notas/${id}`);
    return response.data;
  }
};
