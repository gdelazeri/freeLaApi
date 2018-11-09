const express = require('express');
const ProjectController = require('../controllers/projectController');

const router = express.Router();

/* GET /project/list */
router.get('/list/:professionalId', ProjectController.list);

/* GET /project/get/{id} */
router.get('/get/:id', ProjectController.get);

/* POST /project/add */
router.post('/add', ProjectController.add);

/* PUT /project/edit/{id} */
router.put('/edit/:id', ProjectController.edit);

/* DELETE /project/delete/{id} */
router.delete('/delete/:id', ProjectController.delete);

module.exports = router;
