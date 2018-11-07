const DatabaseManager = require('./databaseManager');

class ProjectDao {

  static async list(professionalId) {
    try {
      const sql = `SELECT * FROM project WHERE professionalId = ${professionalId}`;
      const result = await DatabaseManager.query(sql);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async get(id) {
    try {
      const sql = `SELECT * FROM project WHERE id = ${id}`;
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
      const sql = `INSERT INTO project ${columns} VALUES ${values}`;
      await DatabaseManager.query(sql);
      const added = await DatabaseManager.query('SELECT * FROM project ORDER BY id DESC LIMIT 1');
      return added[0];
    } catch (error) {
      throw error;
    }
  }

  static async edit(id, obj) {
    try {
      const { values } = DatabaseManager.parseToEdit(obj);
      const sql = `UPDATE project SET ${values} WHERE id = ${id}`;
      await DatabaseManager.query(sql);
      obj.id = id;
      return obj;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const sql = `DELETE FROM project WHERE id = ${id};`;
      await DatabaseManager.query(sql);
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = ProjectDao;
