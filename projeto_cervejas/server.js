const express = require('express');
const cors = require('cors');
const cervejasRouter = require('./routes/cervejas');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/api', cervejasRouter);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
