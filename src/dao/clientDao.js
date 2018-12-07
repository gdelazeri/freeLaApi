const DatabaseManager = require('./databaseManager');

class ClientDao {

  static async list(professionalEmail) {
    try {
      const sql = `SELECT * FROM Contact WHERE professionalEmail = '${professionalEmail}'`;
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

  static async login(email, password) {
    try {
      const sql = `SELECT * FROM client WHERE email = '${email}' AND password = '${password}' AND active = true`;
      const result = await DatabaseManager.query(sql);
      if (result.length > 0)
        return result[0];
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getByEmail(email) {
    try {
      const sql = `SELECT * FROM client WHERE email = '${email}'`;
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
      const sql = `INSERT INTO client ${columns} VALUES ${values}`;
      await DatabaseManager.query(sql);
      const added = await DatabaseManager.query(`SELECT * FROM client WHERE email = '${obj.email}'`);
      return added[0];
    } catch (error) {
      throw error;
    }
  }

  static async addContact(obj) {
    try {
      const { columns, values } = DatabaseManager.parseToInsert(obj);
      const sql = `INSERT INTO contact ${columns} VALUES ${values}`;
      await DatabaseManager.query(sql);
      const added = await DatabaseManager.query(`SELECT * FROM contact WHERE clientEmail = '${obj.clientEmail}'`);
      return added[0];
    } catch (error) {
      throw error;
    }
  }

  static async edit(id, obj) {
    try {
      const { values } = DatabaseManager.parseToEdit(obj);
      const sql = `UPDATE client SET ${values} WHERE id = ${id}`;
      await DatabaseManager.query(sql);
      obj.id = id;
      return obj;
    } catch (error) {
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

  // static async addProfessionalId(professionalId, clientId) {
  //   try {
  //     const sql = `INSERT INTO professionalxclient (professionalId, clientId) VALUES (${professionalId}, ${clientId});`;
  //     await DatabaseManager.query(sql);
  //     return true;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}

module.exports = ClientDao;
