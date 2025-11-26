import axios from 'axios';
import { Aluno, Professor } from '../types';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Alunos API
export const alunosAPI = {
  getAll: () => api.get<Aluno[]>('/alunos'),
  getById: (id: number) => api.get<Aluno>(`/alunos/${id}`),
  create: (aluno: Aluno) => api.post<Aluno>('/alunos', aluno),
  update: (id: number, aluno: Partial<Aluno>) => api.put<Aluno>(`/alunos/${id}`, aluno),
  delete: (id: number) => api.delete(`/alunos/${id}`),
};

// Professores API
export const professoresAPI = {
  getAll: () => api.get<Professor[]>('/professores'),
  getById: (id: number) => api.get<Professor>(`/professores/${id}`),
  create: (professor: Professor) => api.post<Professor>('/professores', professor),
  update: (id: number, professor: Partial<Professor>) => api.put<Professor>(`/professores/${id}`, professor),
  delete: (id: number) => api.delete(`/professores/${id}`),
};

export default api;
