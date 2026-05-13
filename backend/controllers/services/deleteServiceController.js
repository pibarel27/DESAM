const Service = require("../../models/services");

const deleteServiceController = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        message: "Ids array is required",
      });
    }

    const result = await Service.deleteMany({
      _id: { $in: ids },
    });

    res.status(200).json({
      message: "Services deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = deleteServiceController;