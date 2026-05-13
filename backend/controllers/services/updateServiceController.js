const Service = require("../../models/services");

const updateServiceController = async (req, res) => {
  try {
    const { updates } = req.body;

    if (!updates || !Array.isArray(updates) || updates.length === 0) {
      return res.status(400).json({
        message: "Updates array is required",
      });
    }

    const updatedServices = await Promise.all(
      updates.map((item) =>
        Service.findByIdAndUpdate(
          item.id,
          {
            photo: item.photo,
            heading: item.heading,
            description: item.description,
          },
          {
            new: true,
            runValidators: true,
          },
        ),
      ),
    );

    res.status(200).json({
      message: "Services updated successfully",
      updatedServices,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = updateServiceController;