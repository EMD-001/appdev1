// Models/book.model.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    userId: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
