const DatabaseManager = require('./databaseManager');

class ClientDao {

  static async list(professionalId) {
    try {
      const sql = `SELECT * FROM client WHERE EXISTS (SELECT 1 FROM project WHERE client.id = project.clientId AND professionalId = ${professionalId})`;
      const result = await DatabaseManager.query(sql);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async get(id) {
    try {
      const sql = `SELECT * FROM client WHERE id = ${id}`;
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
      console.log({ columns, values });
      const sql = `INSERT INTO client ${columns} VALUES ${values}`;
      const result = await DatabaseManager.query(sql);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async edit(id, obj) {
    try {
      const { values } = DatabaseManager.parseToEdit(obj);
      const sql = `INSERT INTO client SET ${values} WHERE id = ${id}`;
      const result = await DatabaseManager.query(sql);
      return result;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  static async delete(id) {
    try {
      const sql = `DELETE FROM client WHERE id = ${id};`;
      await DatabaseManager.query(sql);
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = ClientDao;
