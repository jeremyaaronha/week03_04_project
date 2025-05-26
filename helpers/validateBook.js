const { Validator } = require('node-input-validator');
const mongoose = require('mongoose');

const validateBook = async (req, res, next) => {
  const validationRules = {
    title: 'required|string|minLength:2',
    author: 'required|string',
    genre: 'required|string|minLength:2',
    pages: 'required|integer|min:1',
    publishedDate: 'required|date',
    ISBN: 'required|string|minLength:10|maxLength:17',
    rating: 'required|numeric|min:0|max:5'
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

  if (!mongoose.Types.ObjectId.isValid(req.body.author)) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      data: {
        author: {
          message: 'Author must be a valid MongoDB ObjectId',
          rule: 'objectId'
        }
      }
    });
  }

  next();
};

module.exports = { validateBook };