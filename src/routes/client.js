const express = require('express');
const ClientController = require('../controllers/clientController');

const router = express.Router();

/* GET /client/list/{professionalId} */
router.get('/list/:professionalId', ClientController.list);

/* GET /client/get/{id} */
router.get('/get/:id', ClientController.get);

router.post('/add', ClientController.add);

router.put('/edit/:id', ClientController.edit);

router.delete('/delete/:id', ClientController.delete);

module.exports = router;
