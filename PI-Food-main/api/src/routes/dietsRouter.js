const { Router } = require('express');
const { createDietsHandler, dietsHandler } = require('../controllers/dietsControllers');

const dietsRouter = Router();

dietsRouter.get('/', dietsHandler);

dietsRouter.post('/', createDietsHandler);

module.exports = dietsRouter;