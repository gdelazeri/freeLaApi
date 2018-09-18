const express = require('express');
const UserController = require('../controllers/clientController');
const UserSchema = require('../routes/schemas/userSchema');
const TokenAuthenticator = require('../middlewares/auth');
const UserRoles = require('../types/userRoles');

const router = express.Router();

router.post('/login', UserSchema.login, UserController.login);

/* GET /user/list */
router.get('/list',
  UserSchema.list,
  TokenAuthenticator.authenticate([
    UserRoles.MASTER,
    UserRoles.MANAGER,
    UserRoles.PRODUCER,
    UserRoles.TECHNICIAN,
  ]),
  UserController.list);

  /* GET /user/colectors */
router.get('/collectors',
  UserSchema.getCollectors,
  TokenAuthenticator.authenticate([
    UserRoles.MASTER,
    UserRoles.MANAGER,
    UserRoles.PRODUCER,
    UserRoles.TECHNICIAN,
  ]),
  UserController.getCollectors);

router.get('/allClients',
  UserSchema.getAllClients,
  TokenAuthenticator.authenticate([
    UserRoles.EAWARE,
  ]),
  UserController.getAllClients);

router.get('/clientList',
  UserSchema.getClients,
  TokenAuthenticator.authenticate([
    UserRoles.MASTER,
    UserRoles.MANAGER,
    UserRoles.PRODUCER,
  ]),
  UserController.getClients);


  /* GET /user */
router.get('/',
  UserSchema.get,
  TokenAuthenticator.authenticate([
    UserRoles.MASTER,
    UserRoles.MANAGER,
    UserRoles.PRODUCER,
    UserRoles.EAWARE,
  ]),
  UserController.get);

/* POST /user */
router.post('/', UserSchema.post,
  TokenAuthenticator.authenticate([
    UserRoles.EAWARE,
    UserRoles.MASTER,
  ]),
  UserController.post);

router.post('/confirmLogin', UserSchema.confirmLogin,
  TokenAuthenticator.authenticate([
    UserRoles.MASTER,
    UserRoles.MANAGER,
    UserRoles.PRODUCER,
    UserRoles.TECHNICIAN,
  ]),
   UserController.confirmLogin);

/* PUT /user/:userId */
router.put('/:userId', UserSchema.put,
  TokenAuthenticator.authenticate([
    UserRoles.EAWARE,
    UserRoles.MASTER,
    UserRoles.MANAGER,
    UserRoles.PRODUCER,
  ]),
  UserController.put);

/* DELETE /user/:userId */
router.delete('/:userId', UserSchema.delete,
  TokenAuthenticator.authenticate([
    UserRoles.EAWARE,
    UserRoles.MASTER,
  ]),
  UserController.delete);

/* PUT /user/aviaryAlert/:userId */
router.put('/aviaryAlert/:userId', UserSchema.aviaryAlert,
  TokenAuthenticator.authenticate([
    UserRoles.EAWARE,
    UserRoles.MASTER,
    UserRoles.MANAGER,
    UserRoles.PRODUCER,
    UserRoles.TECHNICIAN,
  ]),
  UserController.aviaryAlert);

router.post('/passwordRecoveryRequest', UserSchema.passwordRecoveryRequest,
   UserController.passwordRecoveryRequest);

router.put('/passwordRecovery/:userId', UserSchema.passwordRecovery,
   UserController.passwordRecovery);

router.put('/playerId/:userId', UserSchema.playerId,
   UserController.updatePlayerId);

module.exports = router;
