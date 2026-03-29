const js = require('@eslint/js');
const globals = require('globals');
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    plugins: {
      prettier: prettierPlugin,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      // Ativa o plugin do prettier para mostrar erros de formatação como se fossem do ESLint
      'prettier/prettier': 'error',

      // Suas regras de lógica aqui
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
  // O prettierConfig deve ser SEMPRE o último para sobrescrever qualquer regra anterior
  prettierConfig,
];
