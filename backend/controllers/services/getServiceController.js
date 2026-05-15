const Service = require("../../models/services");

const getServiceController = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: 1 });

    res.status(200).json({
      message: "Services fetched successfully",
      services,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = getServiceController;