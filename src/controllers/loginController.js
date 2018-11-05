const LoginDao = require('../dao/loginDao');

class LoginController {
  static async login(req, res) {
    try {
      const users = await LoginDao.login(req.body.email,req.body.password);
      res.send({ success: true, data: users });
    } catch (error) {
      res.send({ success: false, error });
    }
  }
}

module.exports = LoginController;
