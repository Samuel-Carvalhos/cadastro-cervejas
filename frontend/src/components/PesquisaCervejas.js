import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const PesquisaCervejas = () => {
  const [marca, setMarca] = useState('');
  const [dataCadastro, setDataCadastro] = useState('');
  const [resultados, setResultados] = useState([]);

  const handleChangeMarca = (e) => {
    setMarca(e.target.value);
  };

  const handleChangeDataCadastro = (e) => {
    setDataCadastro(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:5000/api/cervejas', {
        params: {
          marca,
          data_cadastro: dataCadastro,
        },
      });
      setResultados(response.data);
    } catch (error) {
      console.error('Erro ao buscar cervejas:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Pesquisar Cervejas</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Marca:</label>
          <input
            type="text"
            className="form-control"
            value={marca}
            onChange={handleChangeMarca}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Data de Cadastro:</label>
          <input
            type="date"
            className="form-control"
            value={dataCadastro}
            onChange={handleChangeDataCadastro}
          />
        </div>
        <button type="submit" className="btn btn-primary">Pesquisar</button>
      </form>
      <h2 className="my-4">Resultados da Pesquisa:</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Marca</th>
            <th>Preço</th>
            <th>Capacidade</th>
            <th>Data de Cadastro</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {resultados.map((cerveja) => (
            <tr key={cerveja.id}>
              <td>{cerveja.marca}</td>
              <td>{cerveja.preco}</td>
              <td>{cerveja.capacidade}ml</td>
              <td>{new Date(cerveja.data_cadastro).toLocaleDateString()}</td>
              <td>{cerveja.tipo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PesquisaCervejas;
