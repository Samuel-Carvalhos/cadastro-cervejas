import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AtualizarCerveja = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cerveja, setCerveja] = useState({
    marca: '',
    preco: '',
    capacidade: '',
    data_cadastro: '',
    tipo_id: ''
  });

  useEffect(() => {
    const fetchCerveja = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cervejas/${id}`);
        setCerveja(response.data);
      } catch (error) {
        console.error('Erro ao buscar cerveja:', error);
      }
    };

    fetchCerveja();
  }, [id]); 

  const handleChange = (e) => {
    setCerveja({ ...cerveja, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/cervejas/${id}`, cerveja);
      alert('Cerveja atualizada com sucesso!');
      navigate('/listagem');
    } catch (error) {
      console.error('Erro ao atualizar cerveja:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Marca:</label>
        <input
          type="text"
          className="form-control"
          name="marca"
          value={cerveja.marca}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Preço:</label>
        <input
          type="number"
          className="form-control"
          name="preco"
          value={cerveja.preco}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Capacidade (ml):</label>
        <input
          type="number"
          className="form-control"
          name="capacidade"
          value={cerveja.capacidade}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Data de Cadastro:</label>
        <input
          type="date"
          className="form-control"
          name="data_cadastro"
          value={cerveja.data_cadastro}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Tipo:</label>
        <select
          className="form-control"
          name="tipo_id"
          value={cerveja.tipo_id}
          onChange={handleChange}
        >
          <option value="">Selecione um tipo</option>
          <option value="1">Ipa American</option>
          <option value="2">Pilsen</option>
          <option value="3">Puro Malte</option>
          <option value="4">Preta</option>
          <option value="5">Duplo Malte</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary mt-3">Atualizar</button>
    </form>
  );
};

export default AtualizarCerveja;
