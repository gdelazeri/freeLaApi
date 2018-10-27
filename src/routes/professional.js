const express = require('express');
const ProfessionalController = require('../controllers/professionalController');

const router = express.Router();

/* GET /professional/list */
router.get('/list', ProfessionalController.list);

/* GET /professional/get/{id} */
router.get('/get/:id', ProfessionalController.get);

/* POST /professional/add */
router.post('/add', ProfessionalController.add);

/* PUT /professional/edit/{id} */
router.put('/edit/:id', ProfessionalController.edit);

/* DELETE /professional/delete/{id} */
router.delete('/delete/:id', ProfessionalController.delete);

module.exports = router;
