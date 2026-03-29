const moment = require('moment');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');

// LISTAR TODOS
exports.getAll = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// BUSCAR POR ID
exports.getById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return res.status(404).json({ error: 'Produto não encontrado' });
  res.json(product);
});

// CRIAR
exports.create = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.stack });
  }
};

// ATUALIZAR (PUT)
exports.update = async (req, res) => {
  try {
    // { new: true } faz o Mongoose retornar o objeto já atualizado
    req.body.updatedAt = moment().toDate(); // Atualiza a data de atualização
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product)
      return res.status(404).json({ error: 'Produto não encontrado' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.stack });
  }
};

// DELETAR
exports.delete = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: false, updatedAt: moment().toDate() },
      { new: true },
    );
    if (!product)
      return res.status(404).json({ error: 'Produto não encontrado' });
    res.json({ message: 'Produto removido com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.stack });
  }
};
