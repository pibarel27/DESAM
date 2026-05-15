const express = require("express");
const upsertIntroController = require("../controllers/home/upsertIntroController");
const getIntroController = require("../controllers/home/getIntroController");

const homeRouter = express.Router();

homeRouter.put("/intro", upsertIntroController);
homeRouter.get("/intro", getIntroController);

module.exports = homeRouter;