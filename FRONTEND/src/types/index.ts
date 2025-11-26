export interface Aluno {
  id_aluno?: number;
  nome: string;
  data_nascimento: string;
  genero: string;
  endereco: string;
  telefone_contato: string;
  nome_responsavel: string;
  cpf_responsavel: string;
  email_responsavel: string;
  data_matricula?: string;
  status_matricula?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Professor {
  id_professor?: number;
  nome: string;
  cpf: string;
  data_nascimento: string;
  genero: string;
  endereco: string;
  telefone: string;
  email: string;
  data_contratacao: string;
  formacao_academica: string;
  status_contrato?: string;
  created_at?: string;
  updated_at?: string;
}
