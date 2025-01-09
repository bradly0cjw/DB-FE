const pool = require('../db');

const getCoupons = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM discounts');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createCoupon = async (req, res) => {
    const { code, type, discount, expiration } = req.body;

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [result] = await connection.query(
            'INSERT INTO discounts (code, discount_type, discount_value, expired_at) VALUES (?,?, ?, ?)',
            [code, type, discount, expiration]
        );

        await connection.commit();
        res.status(201).json({ id: result.insertId, code, discount, expiration });
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ error: error.message });
    } finally {
        connection.release();
    }
};

const updateCoupon = async (req, res) => {
    const { id } = req.params;
    const { code, type, discount, expiration } = req.body;

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [result] = await connection.query(
            'UPDATE discounts SET code = ?, discount_type = ?, discount_value = ?, expired_at = ? WHERE id = ?',
            [code, type, discount, expiration, id]
        );

        await connection.commit();
        res.status(200).json({ id, code, discount, expiration });
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ error: error.message });
    } finally {
        connection.release();
    }
};

const deleteCoupon = async (req, res) => {
    const { id } = req.params;

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [result] = await connection.query('DELETE FROM discounts WHERE id = ?', [id]);

        await connection.commit();
        res.status(200).json({ message: 'discount deleted successfully' });
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ error: error.message });
    } finally {
        connection.release();
    }
};

module.exports = {
    getCoupons,
    createCoupon,
    updateCoupon,
    deleteCoupon
};