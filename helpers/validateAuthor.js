const { Validator } = require('node-input-validator');

const validateAuthor = async (req, res, next) => {
  const validationRules = {
    name: 'required|string|minLength:2',
    birthdate: 'required|date',
    nationality: 'required|string|minLength:2'
  };

  const v = new Validator(req.body, validationRules);
  const matched = await v.check();

  if (!matched) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      data: v.errors
    });
  }

  next();
};

module.exports = { validateAuthor };