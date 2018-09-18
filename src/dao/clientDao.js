const Database = require('./database');

class ClientDao {

  static async list(professionalId) {
    try {
      const sql = `SELECT * FROM client LEFT JOIN person WHERE professionalId = ${professionalId}`;
      const result = await Database.query(sql);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async get(id) {
    try {
      const sql = `SELECT * FROM client LEFT JOIN person WHERE id = ${id}`;
      const result = await Database.query(sql);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async add(obj) {
    try {
      const { columns, values } = Database.parseToInsert(obj);
      const sql = `INSERT INTO client ${columns} VALUES ${values}`;
      const result = await Database.query(sql);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async edit(id, obj) {
    try {
      const { values } = Database.parseToEdit(obj);
      const sql = `INSERT INTO client SET ${values} WHERE id = ${id}`;
      const result = await Database.query(sql);
      return result;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  static async delete(id) {
    try {
      const sql = `DELETE FROM client WHERE id = ${id};`;
      await Database.query(sql);
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = ClientDao;
