const DatabaseManager = require('./databaseManager');

class ProfessionalDao {

  static async list() {
    try {
      const sql = `SELECT * FROM professional`;
      const result = await DatabaseManager.query(sql);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async get(id) {
    try {
      const sql = `SELECT * FROM professional WHERE id = ${id}`;
      const result = await DatabaseManager.query(sql);
      if (result.length > 0)
        return result[0];
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async login(email, password) {
    try {
      const sql = `SELECT * FROM professional WHERE email = '${email}' AND password = '${password}'`;
      const result = await DatabaseManager.query(sql);
      if (result.length > 0)
        return result[0];
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async add(obj) {
    try {
      const { columns, values } = DatabaseManager.parseToInsert(obj);
      const sql = `INSERT INTO professional ${columns} VALUES ${values}`;
      await DatabaseManager.query(sql);
      const added = await DatabaseManager.query('SELECT * FROM professional ORDER BY id DESC LIMIT 1');
      return added[0];
    } catch (error) {
      throw error;
    }
  }

  static async edit(id, obj) {
    try {
      const { values } = DatabaseManager.parseToEdit(obj);
      const sql = `UPDATE professional SET ${values} WHERE id = ${id}`;
      await DatabaseManager.query(sql);
      obj.id = id;
      return obj;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const sql = `DELETE FROM professional WHERE id = ${id};`;
      await DatabaseManager.query(sql);
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = ProfessionalDao;
