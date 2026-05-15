const TeamMember = require("../../../models/teamMember");

const getTeamMembersController = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find();

    res.status(200).json({
      message: "Team members fetched successfully",
      teamMembers,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = getTeamMembersController;