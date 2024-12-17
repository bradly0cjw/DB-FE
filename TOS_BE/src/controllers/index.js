const pool = require('../db');

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  const createdAt = new Date();

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [result] = await connection.query(
      'INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, ?)',
      [username, email, password, createdAt]
    );

    await connection.commit();
    res.status(201).json({ id: result.insertId, username, email, createdAt });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
};

const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getUsers
};