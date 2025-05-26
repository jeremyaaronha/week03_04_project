const { Validator } = require('node-input-validator');

const validateAuthor = async (req, res, next) => {
  const v = new Validator(req.body, {
    name: 'required|string|minLength:2',
    birthdate: 'required|date',
    nationality: 'required|string|minLength:2'
  });

  const matched = await v.check();

  if (!matched) {
    return res.status(422).json({ success: false, errors: v.errors });
  }

  next();
};

module.exports = { validateAuthor };