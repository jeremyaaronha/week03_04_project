const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [2, 'Title must be at least 2 characters long']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: [true, 'Author is required']
  },
  genre: {
    type: String,
    required: [true, 'Genre is required']
  },
  pages: {
    type: Number,
    required: [true, 'Pages are required'],
    min: [1, 'Pages must be greater than 0']
  },
  publishedDate: {
    type: Date,
    required: [true, 'Published date is required']
  },
  ISBN: {
    type: String,
    required: [true, 'ISBN is required']
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  }
});

module.exports = mongoose.model('Book', bookSchema);