const pool = require('../db');

const getCoupons = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM coupons');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createCoupon = async (req, res) => {
    const { code, discount, expiration } = req.body;

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [result] = await connection.query(
            'INSERT INTO coupons (code, discount, expiration) VALUES (?, ?, ?)',
            [code, discount, expiration]
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
    const { code, discount, expiration } = req.body;

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [result] = await connection.query(
            'UPDATE coupons SET code = ?, discount = ?, expiration = ? WHERE id = ?',
            [code, discount, expiration, id]
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

        const [result] = await connection.query('DELETE FROM coupons WHERE id = ?', [id]);

        await connection.commit();
        res.status(200).json({ message: 'Coupon deleted successfully' });
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