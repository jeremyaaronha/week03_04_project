const { Validator } = require('node-input-validator');

const validateBook = async (req, res, next) => {
  const v = new Validator(req.body, {
    title: 'required|string|minLength:2',
    author: 'required|string|minLength:2',
    genre: 'required|string|minLength:2',
    pages: 'required|integer|min:1',
    publishedDate: 'required|date',
    ISBN: 'required|string|minLength:10',
    rating: 'required|numeric|min:0|max:5'
  });

  const matched = await v.check();

  if (!matched) {
    return res.status(422).json({ success: false, errors: v.errors });
  }

  next();
};

module.exports = { validateBook };