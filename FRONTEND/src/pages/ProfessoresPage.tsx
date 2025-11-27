import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { professoresAPI } from '../services/api';
import { Professor } from '../types';
import { useWebSocket } from '../hooks/useWebSocket';
import '../styles/Professores.css';

const ProfessoresPage: React.FC = () => {
  const navigate = useNavigate();
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [formData, setFormData] = useState<Professor>({
    nome: '',
    cpf: '',
    data_nascimento: '',
    genero: '',
    endereco: '',
    telefone: '',
    email: '',
    data_contratacao: '',
    formacao_academica: '',
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const { isConnected, emit, on, off } = useWebSocket();

  const fetchProfessores = async () => {
    try {
      setLoading(true);
      const response = await professoresAPI.getAll();
      setProfessores(response.data);
    } catch (error) {
      console.error('Erro ao buscar professores:', error);
      alert('Erro ao carregar professores');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfessores();
  }, []);

  useEffect(() => {
    const handleProfessorCreated = (data: Professor) => {
      console.log('Professor criado via WebSocket:', data);
      fetchProfessores();
    };

    const handleProfessorUpdated = (data: Professor) => {
      console.log('Professor atualizado via WebSocket:', data);
      fetchProfessores();
    };

    const handleProfessorDeleted = (data: { id: number }) => {
      console.log('Professor deletado via WebSocket:', data);
      fetchProfessores();
    };

    on('professor:created', handleProfessorCreated);
    on('professor:updated', handleProfessorUpdated);
    on('professor:deleted', handleProfessorDeleted);

    return () => {
      off('professor:created', handleProfessorCreated);
      off('professor:updated', handleProfessorUpdated);
      off('professor:deleted', handleProfessorDeleted);
    };
  }, [on, off]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingId) {
        await professoresAPI.update(editingId, formData);
        emit('professor:updated', { id: editingId, ...formData });
        alert('Professor atualizado com sucesso!');
      } else {
        const response = await professoresAPI.create(formData);
        emit('professor:created', response.data);
        alert('Professor criado com sucesso!');
      }
      resetForm();
      fetchProfessores();
    } catch (error) {
      console.error('Erro ao salvar professor:', error);
      alert('Erro ao salvar professor');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (professor: Professor) => {
    setFormData(professor);
    setEditingId(professor.id_professor || null);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este professor?')) {
      try {
        setLoading(true);
        await professoresAPI.delete(id);
        emit('professor:deleted', { id });
        alert('Professor excluído com sucesso!');
        fetchProfessores();
      } catch (error) {
        console.error('Erro ao excluir professor:', error);
        alert('Erro ao excluir professor');
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      cpf: '',
      data_nascimento: '',
      genero: '',
      endereco: '',
      telefone: '',
      email: '',
      data_contratacao: '',
      formacao_academica: '',
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="professores-container">
      <div className="header">
        <h1>Gerenciamento de Professores</h1>
        <div className="connection-status">
          WebSocket: <span className={isConnected ? 'connected' : 'disconnected'}>
            {isConnected ? 'Conectado' : 'Desconectado'}
          </span>
        </div>
      </div>

      <div className="action-buttons">
        <button 
          className="btn btn-secondary"
          onClick={() => navigate('/')}
        >
          Voltar para Home
        </button>
        
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancelar' : '+ Novo Professor'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="professor-form">
          <h2>{editingId ? 'Editar Professor' : 'Novo Professor'}</h2>
          
          <div className="form-grid">
            <div className="form-group">
              <label>Nome Completo *</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>CPF *</label>
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleInputChange}
                placeholder="000.000.000-00"
                required
              />
            </div>

            <div className="form-group">
              <label>Data de Nascimento *</label>
              <input
                type="date"
                name="data_nascimento"
                value={formData.data_nascimento}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Gênero *</label>
              <select
                name="genero"
                value={formData.genero}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </select>
            </div>

            <div className="form-group">
              <label>Endereço *</label>
              <input
                type="text"
                name="endereco"
                value={formData.endereco}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Telefone *</label>
              <input
                type="text"
                name="telefone"
                value={formData.telefone}
                onChange={handleInputChange}
                placeholder="(00) 00000-0000"
                required
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Data de Contratação *</label>
              <input
                type="date"
                name="data_contratacao"
                value={formData.data_contratacao}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Formação Acadêmica *</label>
              <input
                type="text"
                name="formacao_academica"
                value={formData.formacao_academica}
                onChange={handleInputChange}
                placeholder="Ex: Pedagogia"
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-success" disabled={loading}>
              {loading ? 'Salvando...' : editingId ? 'Atualizar' : 'Cadastrar'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={resetForm}>
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="professores-list">
        <h2>Lista de Professores</h2>
        {loading && <p>Carregando...</p>}
        {!loading && professores.length === 0 && <p>Nenhum professor cadastrado.</p>}
        {!loading && professores.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Formação</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {professores.map((professor) => (
                <tr key={professor.id_professor}>
                  <td>{professor.id_professor}</td>
                  <td>{professor.nome}</td>
                  <td>{professor.cpf}</td>
                  <td>{professor.email}</td>
                  <td>{professor.telefone}</td>
                  <td>{professor.formacao_academica}</td>
                  <td>
                    <span className={`status ${professor.status_contrato}`}>
                      {professor.status_contrato}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-edit"
                      onClick={() => handleEdit(professor)}
                    >
                      ✏️ Editar
                    </button>
                    <button 
                      className="btn btn-delete"
                      onClick={() => handleDelete(professor.id_professor!)}
                    >
                      🗑️ Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProfessoresPage;
