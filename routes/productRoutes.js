const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const {
  validateProduct,
  updateValidateProduct,
} = require('../validators/productValidator');

router.get('/', productController.getAll); // GET /api/produtos
router.get('/:id', productController.getById); // GET /api/produtos/ID_AQUI
router.post('/', validateProduct, productController.create); // POST /api/produtos
router.put('/:id', updateValidateProduct, productController.update); // PUT /api/produtos/ID_AQUI
router.delete('/:id', productController.delete); // DELETE /api/produtos/ID_AQUI

module.exports = router;
