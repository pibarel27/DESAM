const Overview = require("../../../models/overview");

const getOverviewController = async (req, res) => {
  try {
    const overview = await Overview.findOne();

    if (!overview) {
      return res.status(404).json({
        message: "Overview not found",
      });
    }

    res.status(200).json({
      message: "Overview fetched successfully",
      overview
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = getOverviewController;