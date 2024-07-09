import React, { useState } from 'react';
import axios from 'axios';

const CadastroCerveja = () => {
  const [marca, setMarca] = useState('');
  const [preco, setPreco] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [dataCadastro, setDataCadastro] = useState('');
  const [tipoId, setTipoId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!marca || !preco || !capacidade || !dataCadastro || !tipoId) {
      alert('Todos os campos são obrigatórios.');
      return;
    }

    const novaCerveja = {
      marca,
      preco,
      capacidade,
      data_cadastro: dataCadastro,
      tipo_id: tipoId,
    };

    try {
      await axios.post('http://localhost:5000/api/cervejas', novaCerveja);
      alert('Cerveja cadastrada com sucesso!');
      setMarca('');
      setPreco('');
      setCapacidade('');
      setDataCadastro('');
      setTipoId('');
    } catch (error) {
      console.error('Erro ao cadastrar cerveja:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Marca:</label>
        <input
          type="text"
          className="form-control"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Preço:</label>
        <input
          type="number"
          className="form-control"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Capacidade (ml):</label>
        <input
          type="number"
          className="form-control"
          value={capacidade}
          onChange={(e) => setCapacidade(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Data de Cadastro:</label>
        <input
          type="date"
          className="form-control"
          value={dataCadastro}
          onChange={(e) => setDataCadastro(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Tipo:</label>
        <select
          className="form-control"
          value={tipoId}
          onChange={(e) => setTipoId(e.target.value)}
        >
          <option value="">Selecione um tipo</option>
          <option value="1">Ipa American</option>
          <option value="2">Pilsen</option>
          <option value="3">Puro Malte</option>
          <option value="4">Preta</option>
          <option value="5">Duplo Malte</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary mt-3">Cadastrar</button>
    </form>
  );
};

export default CadastroCerveja;
