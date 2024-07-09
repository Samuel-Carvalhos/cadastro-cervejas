const express = require('express');
const router = express.Router();
const pool = require('../database.js');



// Busca cervejas com filtros e lista todas

router.get('/cervejas', async (req, res) => {
  try {
    let query = 'SELECT c.id, c.marca, c.preco, c.capacidade, c.data_cadastro, t.nome AS tipo FROM cerveja c JOIN tipo t ON c.tipo_id = t.id';
    const params = [];
    const { marca, data_cadastro } = req.query;

    if (marca) {
      query += ' WHERE c.marca LIKE ?';
      params.push(`%${marca}%`);
    }

    if (data_cadastro) {
      if (params.length === 0) {
        query += ' WHERE';
      } else {
        query += ' AND';
      }
      query += ' c.data_cadastro = ?';
      params.push(data_cadastro);
    }

    const [results] = await pool.query(query, params);
    res.json(results);
  } catch (error) {
    console.error('Erro ao buscar cervejas:', error);
    res.status(500).json({ error: 'Erro interno ao buscar cervejas' });
  }
});




// Rota para cadastrar uma nova cerveja
router.post('/cervejas', async (req, res) => {
  const { marca, preco, capacidade, data_cadastro, tipo_id } = req.body;

  // Verifica se algum campo obrigatório está vazio
  if (!marca || !preco || !capacidade || !data_cadastro || !tipo_id) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    // Insere a cerveja no banco de dados
    await pool.query('INSERT INTO cerveja SET ?', req.body);
    res.status(201).json({ message: 'Cerveja cadastrada com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar cerveja:', error);
    res.status(500).json({ error: 'Erro interno ao cadastrar cerveja.' });
  }
});

// Atualizar uma cerveja
router.put('/cervejas/:id', async (req, res) => {
  const { id } = req.params;
  const { marca, preco, capacidade, data_cadastro, tipo_id } = req.body;
  try {
    await pool.query('UPDATE cerveja SET marca = ?, preco = ?, capacidade = ?, data_cadastro = ?, tipo_id = ? WHERE id = ?', [marca, preco, capacidade, data_cadastro, tipo_id, id]);
    res.status(200).json({ message: 'Cerveja atualizada com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar cerveja' });
  }
});
// Rota para buscar uma cerveja por ID
router.get('/cervejas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM cerveja WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Cerveja não encontrada' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para atualizar uma cerveja por ID
router.put('/cervejas/:id', async (req, res) => {
  const { id } = req.params;
  const { marca, preco, capacidade, data_cadastro, tipo_id } = req.body;
  try {
    await pool.query(
      'UPDATE cerveja SET marca = ?, preco = ?, capacidade = ?, data_cadastro = ?, tipo_id = ? WHERE id = ?',
      [marca, preco, capacidade, data_cadastro, tipo_id, id]
    );
    res.status(200).json({ message: 'Cerveja atualizada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Deletar uma cerveja
router.delete('/cervejas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM cerveja WHERE id = ?', [id]);
    res.status(200).json({ message: 'Cerveja deletada com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar cerveja' });
  }
});

module.exports = router;
