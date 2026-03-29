const express = require('express');
const connectDB = require('./config/databse'); // Importa a função que criamos
const loadEnv = require('./utils/loadEnv.config');
const app = express();
const env = loadEnv();

// Conecta ao banco de dados
connectDB();

app.use(express.json());

const PORT = env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));