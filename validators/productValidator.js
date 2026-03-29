const Joi = require('joi');

// Middleware de validação
const validateProduct = (req, res, next) => {
  const { error } = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
      'string.empty': 'O nome não pode estar vazio',
      'string.min': 'O nome deve ter pelo menos 3 caracteres',
      'any.required': 'O nome é um campo obrigatório',
    }),
    price: Joi.number().positive().required().messages({
      'number.base': 'O preço deve ser um número',
      'number.positive': 'O preço deve ser maior que zero',
    }),
    description: Joi.string().allow('', null), // Opcional
    isActive: Joi.boolean(), // Opcional, padrão true
  }).validate(req.body, { abortEarly: false });

  if (error) {
    const messages = error.details.map((detail) => detail.message);
    return res.status(422).json({ errors: messages });
  }

  next(); // Se estiver tudo certo, vai para o próximo passo (Controller)
};

const updateValidateProduct = (req, res, next) => {
  const { error } = Joi.object({
    name: Joi.string().min(3).max(50).messages({
      'string.empty': 'O nome não pode estar vazio',
      'string.min': 'O nome deve ter pelo menos 3 caracteres',
    }),
    price: Joi.number().positive().messages({
      'number.base': 'O preço deve ser um número',
      'number.positive': 'O preço deve ser maior que zero',
    }),
    description: Joi.string().allow('', null), // Opcional
    isActive: Joi.boolean(), // Opcional, padrão true
  }).validate(req.body, { abortEarly: false });

  if (error) {
    const messages = error.details.map((detail) => detail.message);
    return res.status(422).json({ errors: messages });
  }

  next(); // Se estiver tudo certo, vai para o próximo passo (Controller)
};

module.exports = { validateProduct, updateValidateProduct };
