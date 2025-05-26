const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');
const { validateBook } = require('../helpers/validateBook');

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - genre
 *         - pages
 *         - publishedDate
 *         - ISBN
 *         - rating
 *       properties:
 *         title:
 *           type: string
 *           example: The Great Gatsby
 *         author:
 *           type: string
 *           example: F. Scott Fitzgerald
 *         genre:
 *           type: string
 *           example: Fiction
 *         pages:
 *           type: integer
 *           example: 180
 *         publishedDate:
 *           type: string
 *           format: date
 *           example: 1925-04-10
 *         ISBN:
 *           type: string
 *           example: 9780743273565
 *         rating:
 *           type: number
 *           example: 4.5
 */

/**
 * @swagger
 * tags:
 *   - name: Books
 *     description: API for managing books
 */

/**
 * @swagger
 * /books:
 *   get:
 *     tags: [Books]
 *     summary: Get all books
 *     responses:
 *       200:
 *         description: List of books
 */
router.get('/', booksController.getAllBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     tags: [Books]
 *     summary: Get a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The book ID
 *     responses:
 *       200:
 *         description: Book found
 *       404:
 *         description: Book not found
 */
router.get('/:id', booksController.getBookById);

/**
 * @swagger
 * /books:
 *   post:
 *     tags: [Books]
 *     summary: Create a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Book created successfully
 *       422:
 *         description: Validation error
 */
router.post('/', validateBook, booksController.createBook);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     tags: [Books]
 *     summary: Update a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       422:
 *         description: Validation error
 *       404:
 *         description: Book not found
 */
router.put('/:id', validateBook, booksController.updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     tags: [Books]
 *     summary: Delete a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The book ID
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 */
router.delete('/:id', booksController.deleteBook);

module.exports = router;