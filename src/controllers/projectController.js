const ProjectDao = require('../dao/projectDao');
const ClientDao = require('../dao/clientDao');
const DatabaseManager = require('../dao/databaseManager');
const moment = require('moment');

class ProjectController {
  static async list(req, res) {
    try {
      console.log(req.query);
      const list = await ProjectDao.list(req.query.professionalemail, req.query.clientemail);
      return res.send({ success: true, data: list });
    } catch (error) {
      return res.send({ success: false, error });
    }
  }

  static async listCurrent(req, res) {
    try {
      const list = await ProjectDao.listCurrent(req.query.professionalemail);
      return res.send({ success: true, data: list });
    } catch (error) {
      return res.send({ success: false, error });
    }
  }

  static async get(req, res) {
    try {
      const project = await ProjectDao.get(req.params.id);
      return res.send({ success: true, data: project });
    } catch (error) {
      return res.send({ success: false, error });
    }
  }

  static async add(req, res) {
    try {
      const contact = {
        professionalemail: req.body.professionalemail,
        clientemail: req.body.contact.email,
        name: req.body.contact.name,
        phone1: req.body.contact.phone1.toString(),
        phone2: req.body.contact.phone2,
        cpf: req.body.contact.cpf,
      };
      await DatabaseManager.query('BEGIN TRANSACTION');
      const clientExist = await ClientDao.getByEmail(contact.clientemail);
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
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        presentationdate: req.body.presentationdate,
        likes: req.body.likes,
        dislikes: req.body.dislikes,
        totalvalue: req.body.totalvalue,
        briefing: req.body.briefing,
        professionalemail: req.body.professionalemail,
        clientemail: contact.clientemail,
      }

      project = await ProjectDao.add(project);
      if (project) {
        const briefing = await ProjectDao.addBriefing(project.id, req.body.briefing);
        if (briefing) {
          await DatabaseManager.query('COMMIT');
          return res.send({ success: true, data: project });
        }
      }
      await DatabaseManager.query('ROLLBACK');
      return res.send({ success: false, error: 'error' });
    } catch (error) {
      await DatabaseManager.query('ROLLBACK');
      return res.send({ success: false, error });
    }
  }

  static async edit(req, res) {
    try {
      const project = await ProjectDao.edit(req.params.id, req.body);
      const success = project ? true : false;
      return res.send({ success, data: project });
    } catch (error) {
      return res.send({ success: false, error });
    }
  }

  static async delete(req, res) {
    try {
      const success = await ProjectDao.delete(req.params.id);
      return res.send({ success });
    } catch (error) {
      return res.send({ success: false, error });
    }
  }

  static async getItens(req, res) {
    try {
      const itens = await ProjectDao.getItens(req.params.id);
      return res.send({ success: true, data: itens });
    } catch (error) {
      console.log(error)
      return res.send({ success: false, error });
    }
  }

  static async addItem(req, res) {
    try {
      console.log(req.body);
      const item = await ProjectDao.addItem(req.body);
      return res.send({ success: true, data: item });
    } catch (error) {
      console.log(error)
      return res.send({ success: false, error });
    }
  }

  static async editItem(req, res) {
    try {
      const item = await ProjectDao.editItem(req.body, req.params.id);
      return res.send({ success: true, data: item });
    } catch (error) {
      return res.send({ success: false, error });
    }
  }

  static async getItem(req, res) {
    try {
      const item = await ProjectDao.getItem(req.params.itemId);
      item.comments = await ProjectDao.listItemComments(req.params.itemId);
      return res.send({ success: true, data: item });
    } catch (error) {
      return res.send({ success: false, error });
    }
  }

  static async addItemComment(req, res) {
    try {
      const comment = {
        projectitemid: req.body.itemId,
        comment: req.body.comment,
        clientemail: req.body.clientemail,
        professionalemail: req.body.professionalemail,
      }
      const commentAdded = await ProjectDao.addItemComment(comment);
      return res.send({ success: true, data: commentAdded });
    } catch (error) {
      return res.send({ success: false, error });
    }
  }

  static async getBriefings(req, res) {
    try {
      const briefings = await ProjectDao.getBriefings(req.params.id);
      return res.send({ success: true, data: briefings });
    } catch (error) {
      return res.send({ success: false, error });
    }
  }
}

module.exports = ProjectController;
