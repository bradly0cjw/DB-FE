const pool = require('../db');

const getEvents = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM events');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const createEvent = async (req, res) => {
    const { event_name, event_start, event_end, status, description, seller_id } = req.body;

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [result] = await connection.query(
            'INSERT INTO events (event_name, event_start, event_end, status, description, seller_id) VALUES (?, ?, ?, ?, ?, ?)',
            [event_name, event_start, event_end, status, description, seller_id]
        );

        await connection.commit();
        res.status(201).json({ id: result.insertId, event_name, event_start, event_end, status, description, seller_id });
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ error: error.message });
    } finally {
        connection.release();
    }
};

const getTicketsByEvent = async (req, res) => {
    const { eventId } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM tickets WHERE event_id = ?', [eventId]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getEvent = async (req, res) => {
    const { eventId } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM events WHERE id = ?', [eventId]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createTicket = async (req, res) => {
    const { event_id, ticket_name, ticket_start, ticket_end, price, status, quantity, description, image_path } = req.body;

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [result] = await connection.query(
            'INSERT INTO tickets (event_id, ticket_name, ticket_start, ticket_end, price, status, quantity, description, image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [event_id, ticket_name, ticket_start, ticket_end, price, status, quantity, description, image_path]
        );

        await connection.commit();
        res.status(201).json({ id: result.insertId, event_id, ticket_name, ticket_start, ticket_end, price, status, quantity, description, image_path });
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ error: error.message });
    } finally {
        connection.release();
    }
};

const searchEvents = async (req, res) => {
    const { q } = req.query;
    try {
        const [rows] = await pool.query('SELECT * FROM events WHERE event_name LIKE ?', [`%${q}%`]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getEvents, createEvent, getTicketsByEvent, getEvent, createTicket, searchEvents
};