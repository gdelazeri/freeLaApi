const DatabaseManager = require('./databaseManager');

class LoginDao {

  static async login(email, password) {
    try {
      if (email && password) {
        const sql = `SELECT * FROM client WHERE email = "${email}" AND password = "${password}"
                      UNION 
                    SELECT * FROM professional WHERE email = "${email}" AND password = "${password}"`;
        const result = await DatabaseManager.query(sql);
        return result;
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = LoginDao;
