import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CadastroCerveja from './components/CadastroCerveja';
import ListagemCervejas from './components/ListagemCervejas';
import PesquisaCervejas from './components/PesquisaCervejas';
import AtualizarCerveja from './components/AtualizarCerveja';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">Sistema de Cadastro de Cervejas</a>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="nav">
              <li className="nav-item">
                <Link className="nav-link active" to="/cadastro">Cadastro de Cerveja</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/listagem">Listagem de Cervejas</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/pesquisa">Pesquisar Cervejas</Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="mt-4">
          <Routes>
            <Route path="/" element={<CadastroCerveja />} />
            <Route path="/cadastro" element={<CadastroCerveja />} />
            <Route path="/listagem" element={<ListagemCervejas />} />
            <Route path="/pesquisa" element={<PesquisaCervejas />} />
            <Route path="/atualizar/:id" element={<AtualizarCerveja />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
