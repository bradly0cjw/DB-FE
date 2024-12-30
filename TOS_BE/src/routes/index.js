const express = require('express');
const { createUser, getUserByToken, getUsers, deleteUser, loginUser } = require('../controllers/user_controller');
const { getEvents, createEvent, updateEvent, deleteEvent, searchEvents, getTicketsByEvent, getEvent, createTicket } = require('../controllers/event_controller');
const { getCoupons, createCoupon, updateCoupon, deleteCoupon } = require('../controllers/coupon_controller');

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
 *                 $ref: '#/components/schemas/User'
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
 *             $ref: '#/components/schemas/CreateUser'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post('/users', createUser);

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Retrieves user information by auth token
 *     responses:
 *       200:
 *         description: User information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get('/user', getUserByToken);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deletes a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/users/:id', deleteUser);

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Retrieves a list of events
 *     responses:
 *       200:
 *         description: A list of events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 */
router.get('/events', getEvents);


router.get('/events/search', searchEvents);

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Creates a new event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 */
router.post('/events', createEvent);

/**
 * @swagger
 * /events/{eventId}/tickets:
 *   get:
 *     summary: Retrieves a list of tickets for an event
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The event ID
 *     responses:
 *       200:
 *         description: A list of tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ticket'
 */
router.get('/events/:eventId/tickets', getTicketsByEvent);

router.get('/event/:eventId', getEvent);
/**
 * @swagger
 * /tickets:
 *   post:
 *     summary: Creates a new ticket
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       201:
 *         description: Ticket created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 */
router.post('/tickets', createTicket);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Logs in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid email or password
 */
router.post('/login', loginUser);

// Update event
router.put('/events/:id', updateEvent);

// Delete event
router.delete('/events/:id', deleteEvent);

// Fetch coupons
router.get('/coupons', getCoupons);

// Create coupon
router.post('/coupons', createCoupon);

// Update coupon
router.put('/coupons/:id', updateCoupon);

// Delete coupon
router.delete('/coupons/:id', deleteCoupon);



module.exports = router;