const ProjectDao = require('../dao/projectDao');
const ClientDao = require('../dao/clientDao');
const moment = require('moment');

class ProjectController {
  static async list(req, res) {
    try {
      const list = await ProjectDao.list(req.params.professionalEmail);
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
      const contact = {
        professionalEmail: req.body.professionalEmail,
        clientEmail: req.body.contact.email,
        phone1: req.body.contact.phone1.toString(),
        phone2: req.body.contact.phone2,
        cpf: req.body.contact.cpf,
      };
      const clientExist = await ClientDao.getByEmail(contact.clientEmail);
      if (!clientExist) {
        const client = {
          email: req.body.contact.email,
          password: "*",
          active: false,
        };
        await ClientDao.add(client);
        await ClientDao.addContact(contact);
        // SendMail.sendNewClient(contact.email);
      } else {
        await ClientDao.addContact(contact);
        // SendMail.sendClientNewProject(contact.email);
      }

      let project = {
        id: moment().unix().toString(),
        name: req.body.name,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        presentationDate: req.body.presentationDate,
        likes: req.body.likes,
        dislikes: req.body.dislikes,
        totalValue: req.body.totalValue,
        professionalEmail: req.body.professionalEmail,
        clientEmail: contact.clientEmail,
      }

      project = await ProjectDao.add(project);
      if (project) {
        const briefing = await ProjectDao.addBriefing(project.id, req.body.briefing);
        if (briefing) {
          res.send({ success: true, data: project });
        }
      }

      res.send({ success: false, error: 'error' });
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

  static async getItens(req, res) {
    try {
      const itens = await ProjectDao.getItens(req.params.id);
      res.send({ success: true, data: itens });
    } catch (error) {
      console.log(error)
      res.send({ success: false, error });
    }
  }

  static async addItem(req, res) {
    try {
      console.log(req.body);
      const item = await ProjectDao.addItem(req.body);
      res.send({ success: true, data: item });
    } catch (error) {
      console.log(error)
      res.send({ success: false, error });
    }
  }

  static async editItem(req, res) {
    try {
      const item = await ProjectDao.editItem(req.body, req.params.id);
      res.send({ success: true, data: item });
    } catch (error) {
      res.send({ success: false, error });
    }
  }

  static async getItem(req, res) {
    try {
      const item = await ProjectDao.getItem(req.params.itemId);
      res.send({ success: true, data: item });
    } catch (error) {
      res.send({ success: false, error });
    }
  }

  static async getBriefings(req, res) {
    try {
      const briefings = await ProjectDao.getBriefings(req.params.id);
      res.send({ success: true, data: briefings });
    } catch (error) {
      res.send({ success: false, error });
    }
  }
}

module.exports = ProjectController;
