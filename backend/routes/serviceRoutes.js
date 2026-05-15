const express = require("express");
const createServiceController = require("../controllers/services/createServiceController");
const deleteServiceController = require("../controllers/services/deleteServiceController");
const updateServiceController = require("../controllers/services/updateServiceController");
const upload = require("../middleware/multer");
const getServiceController = require("../controllers/services/getServiceController");
const serviceRouter = express.Router();


serviceRouter.get("/", getServiceController);
serviceRouter.post('/create',  upload.array("photos"), createServiceController);
serviceRouter.put('/:serviceId',  upload.array("photos"), updateServiceController);
serviceRouter.delete('/:serviceId', deleteServiceController);

module.exports = serviceRouter;