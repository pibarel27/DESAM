const Service = require("../../models/services");

const createServiceController = async(req, res) => {

    try {
        const {services} = req.body;

        if (!services || !Array.isArray(services) || services.length === 0) {
        return res.status(400).json({
            message: "Services array is required",
        });
        }

        // optional validation
        for (let service of services) {
        if (!service.photo || !service.heading || !service.description) {
            return res.status(400).json({
            message: "All fields are required for each service",
            });
        }
        }

        const createdServices = await Service.insertMany(services);

        res.status(200).json({
            message: "Service created successfully",
            createdServices,
        })        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = createServiceController;