const { Router } = require('express');
const { createDietsHandler } = require('../controllers/dietsControllers');

const dietsRouter = Router();

dietsRouter.post('/', createDietsHandler);

module.exports = dietsRouter;