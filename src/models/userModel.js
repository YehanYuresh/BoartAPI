const db = require('../config/database');

class UserModel {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM systemuser');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }
  static async findByName(name) {
    const [rows] = await db.query('SELECT * FROM systemuser WHERE Name = ?', [name]);
    return rows[0];
  }

  static async create(userData) {
    const { name, email, age } = userData;
    const [result] = await db.query(
      'INSERT INTO users (name, email, age) VALUES (?, ?, ?)',
      [name, email, age]
    );
    return { id: result.insertId, name, email, age };
  }

  static async update(id, userData) {
    const { name, email, age } = userData;
    const [result] = await db.query(
      'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?',
      [name, email, age, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = UserModel;