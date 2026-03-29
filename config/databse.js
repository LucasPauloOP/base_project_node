const loadEnv = require('../utils/loadEnv.config');
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const env = loadEnv();
    await mongoose.connect(env.mongoURl);
    console.log('✅ MongoDB conectado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error.message);
    // Encerra o processo com falha
    process.exit(1);
  }
};

module.exports = connectDB;
