const Author = require('../models/author');
const mongoose = require('mongoose');

// GET all authors
const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET author by ID
const getAuthorById = async (req, res) => {
  const authorId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(authorId)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const author = await Author.findById(authorId);
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.status(200).json(author);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create new author
const createAuthor = async (req, res) => {
  try {
    const author = new Author(req.body);
    await author.validate();
    const savedAuthor = await author.save();
    res.status(201).json({ id: savedAuthor._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT update author
const updateAuthor = async (req, res) => {
  const authorId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(authorId)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const updated = await Author.findByIdAndUpdate(authorId, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      return res.status(404).json({ message: 'Author not found' });
    }

    res.status(200).json({ message: 'Author updated successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE author
const deleteAuthor = async (req, res) => {
  const authorId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(authorId)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const deleted = await Author.findByIdAndDelete(authorId);
    if (!deleted) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.status(200).json({ message: 'Author deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
};