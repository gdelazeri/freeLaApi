const express = require('express');
const ProfessionalController = require('../controllers/professionalController');

const router = express.Router();

/* GET /professional/list/{professionalId} */
router.get('/list/:professionalId?', ProfessionalController.list);

/* GET /professional/get/{id} */
router.get('/get/:id', ProfessionalController.get);

router.post('/add', ProfessionalController.add);

router.put('/edit/:id', ProfessionalController.edit);

router.delete('/delete/:id', ProfessionalController.delete);

module.exports = router;
