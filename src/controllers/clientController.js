const ClientDao = require('../dao/clientDao');

class ClientController {
  static async list(req, res) {
    try {
      const list = await ClientDao.list(req.query.professionalId);
      res.send({ success: true, data: list });
    } catch (error) {
      res.send({ success: false, error });
    }
  }

  static async get(req, res) {
    try {
      const client = await ClientDao.get(req.query.id);
      res.send({ success: true, data: client });
    } catch (error) {
      res.send({ success: false, error });
    }
  }

  static async add(req, res) {
    try {
      const client = await ClientDao.add(req.body);

      // send mail to client

      const success = client ? true : false;
      res.send({ success, data: client });
    } catch (error) {
      res.send({ success: false, error });
    }
  }

  static async edit(req, res) {
    try {
      const client = await ClientDao.edit(req.body);
      const success = client ? true : false;
      res.send({ success, data: client });
    } catch (error) {
      res.send({ success: false, error });
    }
  }

  static async delete(req, res) {
    try {
      const success = await ClientDao.delete(req.query.id);
      res.send({ success });
    } catch (error) {
      res.send({ success: false, error });
    }
  }
}

module.exports = ClientController;
