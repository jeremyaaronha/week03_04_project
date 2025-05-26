const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authors');
const { validateAuthor } = require('../helpers/validateAuthor');

/**
 * @swagger
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       required:
 *         - name
 *         - birthdate
 *         - nationality
 *       properties:
 *         name:
 *           type: string
 *           example: Gabriel García Márquez
 *         birthdate:
 *           type: string
 *           format: date
 *           example: 1927-03-06
 *         nationality:
 *           type: string
 *           example: Colombian
 */

/**
 * @swagger
 * tags:
 *   - name: Authors
 *     description: API for managing authors
 */

/**
 * @swagger
 * /authors:
 *   get:
 *     tags: [Authors]
 *     summary: Retrieve all authors
 *     responses:
 *       200:
 *         description: List of authors
 */
router.get('/', authorsController.getAllAuthors);

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     tags: [Authors]
 *     summary: Get an author by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The author ID
 *     responses:
 *       200:
 *         description: Author found
 *       404:
 *         description: Author not found
 */
router.get('/:id', authorsController.getAuthorById);

/**
 * @swagger
 * /authors:
 *   post:
 *     tags: [Authors]
 *     summary: Create a new author
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       201:
 *         description: Author created successfully
 *       422:
 *         description: Validation error
 */
router.post('/', validateAuthor, authorsController.createAuthor);

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     tags: [Authors]
 *     summary: Update an author
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The author ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: Author updated successfully
 *       422:
 *         description: Validation error
 *       404:
 *         description: Author not found
 */
router.put('/:id', validateAuthor, authorsController.updateAuthor);

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     tags: [Authors]
 *     summary: Delete an author
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The author ID
 *     responses:
 *       200:
 *         description: Author deleted successfully
 *       404:
 *         description: Author not found
 */
router.delete('/:id', authorsController.deleteAuthor);

module.exports = router;