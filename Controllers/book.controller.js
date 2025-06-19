const Book = require("../Models/book.model");
const sendEmail = require("../Middlewares/send-email.middleware"); // fixed path

const getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.json({ success: true, books });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.json({ success: false, message: "Book not found!" });
    res.json({ success: true, book });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);

    await sendEmail(book);

    res.json({ success: true, message: "Book successfully added!", book });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) return res.json({ success: false, message: "Book not found!" });
    res.json({ success: true, message: "Book updated!", book });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.json({ success: false, message: "Book not found!" });
    res.json({ success: true, message: "Book deleted!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
