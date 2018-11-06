const ProjectDao = require('../dao/projectDao');

class ProjectController {
  static async list(req, res) {
    try {
      const list = await ProjectDao.list();
      res.send({ success: true, data: list });
    } catch (error) {
      res.send({ success: false, error });
    }
  }

  static async get(req, res) {
    try {
      const project = await ProjectDao.get(req.params.id);
      res.send({ success: true, data: project });
    } catch (error) {
      res.send({ success: false, error });
    }
  }

  static async add(req, res) {
    try {
      const project = await ProjectDao.add(req.body);
      const success = project ? true : false;
      res.send({ success, data: project });
    } catch (error) {
      res.send({ success: false, error });
    }
  }

  static async edit(req, res) {
    try {
      const project = await ProjectDao.edit(req.params.id, req.body);
      const success = project ? true : false;
      res.send({ success, data: project });
    } catch (error) {
      res.send({ success: false, error });
    }
  }

  static async delete(req, res) {
    try {
      const success = await ProjectDao.delete(req.params.id);
      res.send({ success });
    } catch (error) {
      res.send({ success: false, error });
    }
  }
}

module.exports = ProjectController;
