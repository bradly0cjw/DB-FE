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

const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { event_name, event_start, event_end, status, description, seller_id } = req.body;

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [result] = await connection.query(
            'UPDATE events SET event_name = ?, event_start = ?, event_end = ?, status = ?, description = ?, seller_id = ? WHERE id = ?',
            [event_name, event_start, event_end, status, description, seller_id, id]
        );

        await connection.commit();
        res.status(200).json({ id, event_name, event_start, event_end, status, description, seller_id });
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ error: error.message });
    } finally {
        connection.release();
    }
};

const deleteEvent = async (req, res) => {
    const { id } = req.params;

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [result] = await connection.query('DELETE FROM events WHERE id = ?', [id]);

        await connection.commit();
        res.status(200).json({ message: 'Event deleted successfully' });
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
        //get image path from event_image table
        const [image] = await pool.query('SELECT image_path FROM events_images WHERE event_id = ?', [eventId]);
        //add multiple image path to the response
        rows[0].image_path = image.map((img) => img.image_path);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



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
    getEvents, createEvent, getTicketsByEvent, getEvent, searchEvents,
    updateEvent, deleteEvent
};