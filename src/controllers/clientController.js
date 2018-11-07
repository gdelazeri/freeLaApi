const ClientDao = require('../dao/clientDao');

class ClientController {
  static async list(req, res) {
    try {
      const list = await ClientDao.list(req.params.professionalId);
      res.send({ success: true, data: list });
    } catch (error) {
      res.send({ success: false, error });
    }
  }

  static async get(req, res) {
    try {
      const client = await ClientDao.get(req.params.id);
      res.send({ success: true, data: client });
    } catch (error) {
      res.send({ success: false, error });
    }
  }

  static async add(req, res) {
    try {
      // const professionalId = req.body.professionalId;
      // if (professionalId) {
        const client = await ClientDao.add(req.body);
        // await ClientDao.addProfessionalId(professionalId, client.id);

        // send mail to client

        const success = client ? true : false;
        res.send({ success, data: client });
      // } else {
      //   res.send({ success: false, error: 'Professional id not informed' });
      // }

    } catch (error) {
      res.send({ success: false, error });
    }
  }

  static async edit(req, res) {
    try {
      const client = await ClientDao.edit(req.params.id, req.body);
      const success = client ? true : false;
      res.send({ success, data: client });
    } catch (error) {
      res.send({ success: false, error });
    }
  }

  static async delete(req, res) {
    try {
      const success = await ClientDao.delete(req.params.id);
      res.send({ success });
    } catch (error) {
      res.send({ success: false, error });
    }
  }
}

module.exports = ClientController;
