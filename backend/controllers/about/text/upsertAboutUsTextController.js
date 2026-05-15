const AboutUsText = require("../../../models/aboutUsText");

const upsertAboutUsTextController = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        message: "Content is required",
      });
    }

    const aboutUsText = await AboutUsText.findOneAndUpdate(
      {},
      { content },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "About Us content saved successfully",
      aboutUsText,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = upsertAboutUsTextController;