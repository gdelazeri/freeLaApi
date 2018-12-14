const DatabaseManager = require('./databaseManager');

class ProjectDao {

  static async list(professionalemail, clientemail) {
    try {
      let sql = `SELECT * FROM project WHERE professionalemail = '${professionalemail}'`;
      sql += clientemail ? ` AND clientemail = '${clientemail}'` : '';
      const result = await DatabaseManager.query(sql);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async listCurrent(professionalemail) {
    try {
      const sql = `SELECT * FROM project WHERE professionalemail = '${professionalemail}' AND enddate IS NULL AND expectedenddate IS NOT NULL ORDER BY expectedenddate ASC`;
      const result = await DatabaseManager.query(sql);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async get(id) {
    try {
      const sql = `SELECT * FROM project WHERE id = '${id}'`;
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
      const sql = `UPDATE project SET ${values} WHERE id = '${id}'`;
      await ProjectDao.addBriefing(id, obj.briefing);
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
  
  static async addBriefing(projectId, briefing) {
    try {
      const sql = `INSERT INTO briefingHistory (projectId, briefing) VALUES ('${projectId}', '${briefing}')`;
      await DatabaseManager.query(sql);
      const added = await DatabaseManager.query('SELECT * FROM briefingHistory ORDER BY date DESC LIMIT 1');
      return added[0];
    } catch (error) {
      throw error;
    }
  }

  static async getBriefings(projectId) {
    try {
      const sql = `SELECT * FROM briefingHistory WHERE projectId = '${projectId}' ORDER BY date DESC`;
      const briefings = await DatabaseManager.query(sql);
      return briefings;
    } catch (error) {
      throw error;
    }
  }

  static async getItens(projectId) {
    try {
      const sql = `SELECT * FROM projectItem WHERE projectId = '${projectId}'`;
      const itens = await DatabaseManager.query(sql);
      return itens;
    } catch (error) {
      throw error;
    }
  }

  static async addItem(obj) {
    try {
      const { columns, values } = DatabaseManager.parseToInsert(obj);
      const sql = `INSERT INTO projectItem ${columns} VALUES ${values}`;
      await DatabaseManager.query(sql);
      const added = await DatabaseManager.query('SELECT * FROM project ORDER BY id DESC LIMIT 1');
      return added[0];
    } catch (error) {
      throw error;
    }
  }

  static async editItem(obj, id) {
    try {
      const { values } = DatabaseManager.parseToEdit(obj);
      const sql = `UPDATE projectItem SET ${values} WHERE id = ${id}`;
      await DatabaseManager.query(sql);
      obj.id = id;
      return obj;
    } catch (error) {
      throw error;
    }
  }

  static async getItem(id) {
    try {
      const sql = `SELECT * FROM ProjectItem WHERE id = ${id};`
      const item = await DatabaseManager.query(sql);
      if (item.length === 1) {
        return item[0];
      } else {
        return undefined
      }
    } catch (error) {
      throw error;
    }
  }

  static async listItemComments(id) {
    try {
      const sql = `SELECT * FROM Comment WHERE projectitemid = ${id} ORDER BY id;`
      const comments = await DatabaseManager.query(sql);
      return comments;
    } catch (error) {
      throw error;
    }
  }

  static async addItemComment(obj) {
    try {
      const { columns, values } = DatabaseManager.parseToInsert(obj);
      const sql = `INSERT INTO comment ${columns} VALUES ${values}`;
      await DatabaseManager.query(sql);
      const added = await DatabaseManager.query('SELECT * FROM comment ORDER BY id DESC LIMIT 1');
      return added[0];
    } catch (error) {
      throw error;
    }
  }

  static async listNextItens(professionalemail) {
    try {
      const sql = `SELECT projectitem.id, projectitem.name as name, projectitem.expectedenddate, project.name as projectname, project.id as projectid, clientemail FROM projectitem LEFT JOIN project ON project.id = projectitem.projectid WHERE project.professionalemail = '${professionalemail}' AND projectitem.enddate IS NULL AND projectitem.expectedenddate IS NOT NULL ORDER BY projectitem.expectedenddate`;
      const itens = await DatabaseManager.query(sql);
      return itens;
    } catch (error) {
      throw error;
    }
  }

  static async getItemFiles(itemId) {
    try {
      const sql = `SELECT * FROM File WHERE projectitemid = ${itemId}`;
      const files = await DatabaseManager.query(sql);
      return files;
    } catch (error) {
      throw error;
    }
  }

  static async addItemFile(itemId, filename) {
    try {
      const sql = `INSERT INTO File (projectitemid, file) VALUES (${itemId}, '${filename}')`;
      await DatabaseManager.query(sql);
      return;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProjectDao;
