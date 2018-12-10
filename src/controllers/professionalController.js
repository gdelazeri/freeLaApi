const ProfessionalDao = require('../dao/professionalDao');

class ProfessionalController {
  static async list(req, res) {
    try {
      const list = await ProfessionalDao.list();
      return res.send({ success: true, data: list });
    } catch (error) {
      return res.send({ success: false, error });
    }
  }

  static async get(req, res) {
    try {
      const professional = await ProfessionalDao.get(req.params.id);
      return res.send({ success: true, data: professional });
    } catch (error) {
      return res.send({ success: false, error });
    }
  }

  static async add(req, res) {
    try {
      const professional = await ProfessionalDao.add(req.body);
      const success = professional ? true : false;
      return res.send({ success, data: professional });
    } catch (error) {
      return res.send({ success: false, error });
    }
  }

  static async edit(req, res) {
    try {
      const professional = await ProfessionalDao.edit(req.params.id, req.body);
      const success = professional ? true : false;
      return res.send({ success, data: professional });
    } catch (error) {
      return res.send({ success: false, error });
    }
  }

  static async delete(req, res) {
    try {
      const success = await ProfessionalDao.delete(req.params.id);
      return res.send({ success });
    } catch (error) {
      return res.send({ success: false, error });
    }
  }
}

module.exports = ProfessionalController;
