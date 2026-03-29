const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    isActive: { type: Boolean, default: true },
  },
  {
    // Isso cria 'createdAt' e 'updatedAt' automaticamente
    timestamps: true,
  },
);

module.exports = mongoose.model('Product', ProductSchema);
