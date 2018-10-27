const express = require('express');
const ClientController = require('../controllers/clientController');

const router = express.Router();

/* GET /client/list/{professionalId} */
router.get('/list/:professionalId?', ClientController.list);

/* GET /client/get/{id} */
router.get('/get/:id', ClientController.get);

/* POST /client/add/{id} */
router.post('/add', ClientController.add);

/* PUT /client/edit/{id} */
router.put('/edit/:id', ClientController.edit);

/* DELETE /client/delete/{id} */
router.delete('/delete/:id', ClientController.delete);

module.exports = router;
