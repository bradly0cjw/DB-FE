const express = require('express');
const { createUser, getUsers } = require('../controllers/index');

const router = express.Router();

/**
 * @swagger
 * /ping:
 *   get:
 *     summary: Returns pong
 *     responses:
 *       200:
 *         description: Pong response
 */
router.get('/ping', (req, res) => {
  res.send('pong');
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieves a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   username:
 *                     type: string
 *                     example: JohnDoe
 *                   email:
 *                     type: string
 *                     example: johndoe@example.com
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: 2023-10-01T12:00:00Z
 */
router.get('/users', getUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Creates a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: JohnDoe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 162738495
 *                 username:
 *                   type: string
 *                   example: JohnDoe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: 2023-10-01T12:00:00Z
 */
router.post('/users', createUser);

module.exports = router;