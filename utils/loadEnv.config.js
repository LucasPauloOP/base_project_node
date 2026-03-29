const path = require('path');
const dotenv = require('dotenv');

module.exports = () => {
  //  const ambiente = process.env.NODE_ENV || 'development';
  const ambiente = process.env.NODE_ENV;

  const arquivoEnv = `${ambiente}.env`;
  const pathString = path.resolve(__dirname, '../', arquivoEnv);
  const resultado = dotenv.config({
    path: pathString,
  });

  if (resultado.error) {
    console.error(
      `❌ Erro: Não foi possível encontrar o arquivo ${arquivoEnv}`,
    );
  } else {
    return resultado.parsed;
  }
};
