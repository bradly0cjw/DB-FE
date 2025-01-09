const pool = require('../db');

const createTicket = async (req, res) => {
    const { event_id, ticket_name, ticket_start, ticket_end, price, status, quantity, description, image_path } = req.body; 

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [result] = await connection.query(
            'INSERT INTO tickets (event_id, ticket_name, ticket_start, ticket_end, price, status, quantity, description, image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [event_id, ticket_name, ticket_start, ticket_end, price, "available", quantity, description, image_path]
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

const updateTicket = async (req, res) => {
    const { id } = req.params;
    const { ticket_name, ticket_start, ticket_end, price, status, quantity, description, image_path } = req.body;

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        await connection.query(
            'UPDATE tickets SET ticket_name = ?, ticket_start = ?, ticket_end = ?, price = ?, status = ?, quantity = ?, description = ?, image_path = ? WHERE id = ?',
            [ticket_name, ticket_start, ticket_end, price, status, quantity, description, image_path, id]
        );

        await connection.commit();
        res.status(200).json({ id, ticket_name, ticket_start, ticket_end, price, status, quantity, description, image_path });
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ error: error.message });
    } finally {
        connection.release();
    }
};

const deleteTicket = async (req, res) => {
    const { id } = req.params;

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        await connection.query('DELETE FROM tickets WHERE id = ?', [id]);

        await connection.commit();
        res.status(200).json({ id });
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ error: error.message });
    } finally {
        connection.release();
    }
};
const getTicketByID = async (req, res) => {
    const { id } = req.params;
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const [rows] = await connection.query('SELECT * FROM tickets WHERE id = ?', [id]);
        await connection.commit();
        res.json(rows);
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ error: error.message });
    } finally {
        connection.release();
    }
};
module.exports = {
    createTicket,
    updateTicket,
    deleteTicket,
    getTicketByID
};