import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const ListagemCervejas = () => {
  const [cervejas, setCervejas] = useState([]);

  useEffect(() => {
    fetchCervejas();
  }, []);

  const fetchCervejas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cervejas');
      setCervejas(response.data);
    } catch (error) {
      console.error('Erro ao buscar cervejas:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Exibe um modal de confirmação antes de deletar
      if (window.confirm('Tem certeza que deseja excluir esta cerveja?')) {
        await axios.delete(`http://localhost:5000/api/cervejas/${id}`);
        fetchCervejas(); // Atualiza a lista após deletar
      }
    } catch (error) {
      console.error('Erro ao deletar cerveja:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Listagem de Cervejas</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Marca</th>
            <th>Preço</th>
            <th>Capacidade/ml</th>
            <th>Data de Cadastro</th>
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {cervejas.map((cerveja) => (
            <tr key={cerveja.id}>
              <td>{cerveja.marca}</td>
              <td>R${cerveja.preco}</td>
              <td>{cerveja.capacidade}ml</td>
              <td>{new Date(cerveja.data_cadastro).toLocaleDateString()}</td>
              <td>{cerveja.tipo}</td> 
              <td>
                <Link to={`/atualizar/${cerveja.id}`} className="btn btn-primary btn-sm me-2">Atualizar</Link>
                <button onClick={() => handleDelete(cerveja.id)} className="btn btn-danger btn-sm">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListagemCervejas;
