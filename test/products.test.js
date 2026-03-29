const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); // Importa seu app Express

// Antes de todos os testes, conectamos ou limpamos o banco
beforeAll(async () => {
  // Se quiser usar um banco de teste separado, a lógica do dotenv faria isso aqui
});

// Após os testes, fechamos a conexão
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Product API CRUD', () => {
  it('Deve listar todos os produtos com sucesso', async () => {
    const res = await request(app).get('/api/produtos');

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('Deve criar um novo produto com dados válidos', async () => {
    const res = await request(app).post('/api/produtos').send({
      name: 'Produto de Teste',
      price: 99.9,
      description: 'Criado via Jest',
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('Produto de Teste');
  });

  it('Deve barrar a criação de produto sem nome (Validação Joi)', async () => {
    const res = await request(app).post('/api/produtos').send({ price: 50 }); // Falta o nome

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('errors');
  });
});
