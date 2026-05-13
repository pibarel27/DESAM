const express = require("express");
const createServiceController = require("../controllers/services/createServiceController");
const deleteServiceController = require("../controllers/services/deleteServiceController");
const updateServiceController = require("../controllers/services/updateServiceController");
const serviceRouter = express.Router();


serviceRouter.post('/create', createServiceController);
serviceRouter.put('/:serviceId', updateServiceController);
serviceRouter.delete('/:serviceId', deleteServiceController);

module.exports = serviceRouter;