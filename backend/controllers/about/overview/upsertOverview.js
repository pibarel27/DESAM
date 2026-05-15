const Overview = require("../../../models/overview");

const upsertOverviewController = async (req, res) => {
  try {
    const { vision, mission, values } = req.body;

    const overview = await Overview.findOneAndUpdate(
      {},
      { vision, mission, values },
      {
        new: true,
        upsert: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      message: "Overview saved successfully",
      overview,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = upsertOverviewController;
