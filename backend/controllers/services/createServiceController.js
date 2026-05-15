const Service = require("../../models/services");
const cloudinary = require("../../config/cloudinary");

const createServiceController = async (req, res) => {
  try {
    const { services } = req.body;

    const parsedServices =
      typeof services === "string" ? JSON.parse(services) : services;

    if (
      !parsedServices ||
      !Array.isArray(parsedServices) ||
      parsedServices.length === 0
    ) {
      return res.status(400).json({
        message: "Services array is required",
      });
    }

    const createdServicesData = await Promise.all(
      parsedServices.map(async (service, index) => {
        if (!service.heading || !service.description) {
          throw new Error(
            "Heading and description are required for each service"
          );
        }

        let photoUrl = "";

        if (req.files && req.files[index]) {
          const result = await cloudinary.uploader.upload(
            req.files[index].path,
            {
              folder: "services",
            }
          );

          photoUrl = result.secure_url;
        }

        return {
          photo: photoUrl,
          heading: service.heading,
          description: service.description,
        };
      })
    );

    const createdServices = await Service.insertMany(createdServicesData);

    res.status(201).json({
      message: "Services created successfully",
      createdServices,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = createServiceController;