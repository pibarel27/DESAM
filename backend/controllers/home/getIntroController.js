const Intro = require("../../models/intro");

const getIntroController = async (req, res) => {
  try {
    const intro = await Intro.findOne();

    if (!intro) {
      return res.status(404).json({
        message: "Intro not found",
      });
    }

    res.status(200).json({
      message: "Intro fetched successfully",
      intro,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = getIntroController;