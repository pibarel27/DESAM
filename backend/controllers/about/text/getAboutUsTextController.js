const AboutUsText = require("../../../models/aboutUsText");

const getAboutUsTextController = async (req, res) => {
  try {
    const aboutUsText = await AboutUsText.findOne();

    res.status(200).json({
      message: "About Us content fetched successfully",
      aboutUsText,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = getAboutUsTextController;