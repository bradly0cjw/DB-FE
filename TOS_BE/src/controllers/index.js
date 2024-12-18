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

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [result] = await connection.query('DELETE FROM users WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      throw new Error('User not found');
    }

    await connection.commit();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
}

module.exports = {
  createUser,
  getUsers,
  deleteUser
};