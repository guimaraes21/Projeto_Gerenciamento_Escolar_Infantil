import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { alunosAPI } from '../services/api';
import { Aluno } from '../types';
import { useWebSocket } from '../hooks/useWebSocket';
import '../styles/Alunos.css';

const AlunosPage: React.FC = () => {
  const navigate = useNavigate();
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [formData, setFormData] = useState<Aluno>({
    nome: '',
    data_nascimento: '',
    genero: '',
    endereco: '',
    telefone_contato: '',
    nome_responsavel: '',
    cpf_responsavel: '',
    email_responsavel: '',
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const { isConnected, emit, on, off } = useWebSocket();

  // Carregar alunos
  const fetchAlunos = async () => {
    try {
      setLoading(true);
      const response = await alunosAPI.getAll();
      setAlunos(response.data);
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
      alert('Erro ao carregar alunos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  // WebSocket listeners
  useEffect(() => {
    const handleAlunoCreated = (data: Aluno) => {
      console.log('Aluno criado via WebSocket:', data);
      fetchAlunos();
    };

    const handleAlunoUpdated = (data: Aluno) => {
      console.log('Aluno atualizado via WebSocket:', data);
      fetchAlunos();
    };

    const handleAlunoDeleted = (data: { id: number }) => {
      console.log('Aluno deletado via WebSocket:', data);
      fetchAlunos();
    };

    on('aluno:created', handleAlunoCreated);
    on('aluno:updated', handleAlunoUpdated);
    on('aluno:deleted', handleAlunoDeleted);

    return () => {
      off('aluno:created', handleAlunoCreated);
      off('aluno:updated', handleAlunoUpdated);
      off('aluno:deleted', handleAlunoDeleted);
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
        await alunosAPI.update(editingId, formData);
        emit('aluno:updated', { id: editingId, ...formData });
        alert('Aluno atualizado com sucesso!');
      } else {
        const response = await alunosAPI.create(formData);
        emit('aluno:created', response.data);
        alert('Aluno criado com sucesso!');
      }
      resetForm();
      fetchAlunos();
    } catch (error) {
      console.error('Erro ao salvar aluno:', error);
      alert('Erro ao salvar aluno');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (aluno: Aluno) => {
    setFormData(aluno);
    setEditingId(aluno.id_aluno || null);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este aluno?')) {
      try {
        setLoading(true);
        await alunosAPI.delete(id);
        emit('aluno:deleted', { id });
        alert('Aluno excluído com sucesso!');
        fetchAlunos();
      } catch (error) {
        console.error('Erro ao excluir aluno:', error);
        alert('Erro ao excluir aluno');
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      data_nascimento: '',
      genero: '',
      endereco: '',
      telefone_contato: '',
      nome_responsavel: '',
      cpf_responsavel: '',
      email_responsavel: '',
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="alunos-container">
      <div className="header">
        <h1>Gerenciamento de Alunos</h1>
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
          {showForm ? 'Cancelar' : '+ Novo Aluno'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="aluno-form">
          <h2>{editingId ? 'Editar Aluno' : 'Novo Aluno'}</h2>
          
          <div className="form-grid">
            <div className="form-group">
              <label>Nome do Aluno *</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
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
              <label>Telefone de Contato *</label>
              <input
                type="text"
                name="telefone_contato"
                value={formData.telefone_contato}
                onChange={handleInputChange}
                placeholder="(00) 00000-0000"
                required
              />
            </div>

            <div className="form-group">
              <label>Nome do Responsável *</label>
              <input
                type="text"
                name="nome_responsavel"
                value={formData.nome_responsavel}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>CPF do Responsável *</label>
              <input
                type="text"
                name="cpf_responsavel"
                value={formData.cpf_responsavel}
                onChange={handleInputChange}
                placeholder="000.000.000-00"
                required
              />
            </div>

            <div className="form-group">
              <label>Email do Responsável *</label>
              <input
                type="email"
                name="email_responsavel"
                value={formData.email_responsavel}
                onChange={handleInputChange}
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

      <div className="alunos-list">
        <h2>Lista de Alunos</h2>
        {loading && <p>Carregando...</p>}
        {!loading && alunos.length === 0 && <p>Nenhum aluno cadastrado.</p>}
        {!loading && alunos.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Data Nascimento</th>
                <th>Gênero</th>
                <th>Responsável</th>
                <th>Telefone</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {alunos.map((aluno) => (
                <tr key={aluno.id_aluno}>
                  <td>{aluno.id_aluno}</td>
                  <td>{aluno.nome}</td>
                  <td>{new Date(aluno.data_nascimento).toLocaleDateString('pt-BR')}</td>
                  <td>{aluno.genero}</td>
                  <td>{aluno.nome_responsavel}</td>
                  <td>{aluno.telefone_contato}</td>
                  <td>
                    <span className={`status ${aluno.status_matricula}`}>
                      {aluno.status_matricula}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-edit"
                      onClick={() => handleEdit(aluno)}
                    >
                      ✏️ Editar
                    </button>
                    <button 
                      className="btn btn-delete"
                      onClick={() => handleDelete(aluno.id_aluno!)}
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

export default AlunosPage;
