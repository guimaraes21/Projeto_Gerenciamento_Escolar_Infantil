import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AlunosPage from './pages/AlunosPage';
import ProfessoresPage from './pages/ProfessoresPage';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="navbar-brand">
            <h1>Sistema Escolar Infantil</h1>
          </div>
          <div className="navbar-menu">
            <Link to="/alunos" className="nav-link">Alunos</Link>
            <Link to="/professores" className="nav-link">Professores</Link>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <div className="home">
                <h1>Bem-vindo ao Sistema de Gerenciamento Escolar Infantil</h1>
                <p>Selecione uma opção no menu acima para começar.</p>
                <div className="features">
                  <div className="feature-card">
                    <h3>React + TypeScript</h3>
                    <p>Interface moderna e tipada</p>
                  </div>
                  <div className="feature-card">
                    <h3>Vite</h3>
                    <p>Build rápido e otimizado</p>
                  </div>
                  <div className="feature-card">
                    <h3>WebSocket</h3>
                    <p>Atualizações em tempo real</p>
                  </div>
                  <div className="feature-card">
                    <h3>Docker</h3>
                    <p>Backend containerizado</p>
                  </div>
                </div>
              </div>
            } />
            <Route path="/alunos" element={<AlunosPage />} />
            <Route path="/professores" element={<ProfessoresPage />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>Sistema de Gerenciamento Escolar Infantil - UniFAAT-ADS © 2025</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
