const express = require('express');
const ProjectController = require('../controllers/projectController');

const router = express.Router();

/* GET /project/list/{professionalemail} */
router.get('/list/', ProjectController.list);

/* GET /project/listCurrent/{professionalemail} */
router.get('/listCurrent/', ProjectController.listCurrent);

/* GET /project/get/{id} */
router.get('/get/:id', ProjectController.get);

/* POST /project/add */
router.post('/add', ProjectController.add);

/* PUT /project/edit/{id} */
router.put('/edit/:id', ProjectController.edit);

/* DELETE /project/delete/{id} */
router.delete('/delete/:id', ProjectController.delete);

/* GET /project/itens/{id} */
router.get('/itens/:id', ProjectController.getItens);

/* POST /project/addItem */
router.post('/addItem', ProjectController.addItem);

/* PUT /project/editItem */
router.put('/editItem/:id', ProjectController.editItem);

/* GET /project/getItem/{itemId} */
router.get('/getItem/:itemId', ProjectController.getItem);

/* POST /project/addItemComment/{itemId} */
router.post('/addItemComment/', ProjectController.addItemComment);

/* GET /project/briefing/{projectId} */
router.get('/briefing/:id', ProjectController.getBriefings);

/* GET /project/briefing/{professionalemail} */
router.get('/listNextItens/:professionalemail', ProjectController.listNextItens);

module.exports = router;
