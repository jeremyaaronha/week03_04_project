const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Name must be at least 2 characters']
  },
  birthdate: {
    type: Date,
    required: [true, 'Birthdate is required']
  },
  nationality: {
    type: String,
    required: [true, 'Nationality is required']
  }
});

module.exports = mongoose.model('Author', authorSchema);