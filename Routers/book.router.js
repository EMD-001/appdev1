const express = require("express");
const router = express.Router();
const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require("../Controllers/book.controller");

const verifyToken = require("../Middlewares/jwt.middleware");

router.use(verifyToken); // 🔐 Protect all book routes

router.get("/", getBooks);
router.get("/:id", getBook);
router.post("/", createBook);
router.patch("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
