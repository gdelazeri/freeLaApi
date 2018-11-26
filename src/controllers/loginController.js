const ProfessionalDao = require('../dao/professionalDao');
const ClientDao = require('../dao/clientDao');

class LoginController {
  static async login(req, res) {
    try {
      if (req.body.type === 'P') {
        const professional = await ProfessionalDao.login(req.body.email,req.body.password);
        if (professional) {
          return res.send({ success: true, data: professional });
        } else {
          return res.send({ success: true, data: 'E-mail e senha incorretos ou não cadastrados' });
        }
      } else if (req.body.type === 'C') {
        const client = await ClientDao.login(req.body.email,req.body.password);
        if (client) {
          return res.send({ success: true, data: client });
        } else {
          return res.send({ success: true, data: 'E-mail e senha incorretos ou não cadastrados' });
        }
      } else {
        return res.send({ success: false, error: 'Informe o tipo de login' });
      }
      return res.send({ success: true, data: users });
    } catch (error) {
      return res.send({ success: false, error });
    }
  }
}

module.exports = LoginController;
