const Intro = require("../../models/intro");

const upsertIntroController = async (req, res) => {
  try {
    const { title, motto, description } = req.body;

    const intro = await Intro.findOneAndUpdate(
      {},
      { title, motto, description },
      {
        new: true,
        upsert: true, // creates if not exists
        runValidators: true,
      },
    );

    res.status(200).json({
      message: "Intro saved successfully",
      intro,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = upsertIntroController;
