const express = require('express');
const connectDB = require('./config/databse');
const loadEnv = require('./utils/loadEnv.config');
const app = express();
const env = loadEnv();
const productRoutes = require('./routes/productRoutes');

// Conecta ao banco de dados
connectDB();

app.use(express.json());
app.use('/api/produtos', productRoutes);

const PORT = env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

app.use((err, req, res) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Erro interno no servidor',
    // Só mostra o stack do erro se estiver em desenvolvimento
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

module.exports = app;
