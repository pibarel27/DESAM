const express = require("express");
const createTeamMembersController = require("../controllers/about/teamMember/createTeamMemberController");
const updateTeamMembersController = require("../controllers/about/teamMember/upsertTeamMembersController");
const deleteTeamMembersController = require("../controllers/about/teamMember/deleteTeamMembersController");
const upsertOverviewController = require("../controllers/about/overview/upsertOverview");
const getOverviewController = require("../controllers/about/overview/getOverviewController");
const getTeamMembersController = require("../controllers/about/teamMember/getTeamMembersController");
const upload = require("../middleware/multer");
const getAboutUsTextController = require("../controllers/about/text/getAboutUsTextController");
const upsertAboutUsTextController = require("../controllers/about/text/upsertAboutUsTextController");


const aboutUsRouter = express.Router();


// text
aboutUsRouter.get("/about-text", getAboutUsTextController);
aboutUsRouter.put("/about-text", upsertAboutUsTextController);

// Overview
aboutUsRouter.get("/overview", getOverviewController);
aboutUsRouter.put("/overview", upsertOverviewController);

// Team members 
aboutUsRouter.get("/team-members", getTeamMembersController);
aboutUsRouter.post("/team-members/create", upload.array("photos"), createTeamMembersController);
aboutUsRouter.put("/team-members/update", upload.array("photos"), updateTeamMembersController);
aboutUsRouter.delete("/team-members/delete", deleteTeamMembersController);

module.exports = aboutUsRouter;