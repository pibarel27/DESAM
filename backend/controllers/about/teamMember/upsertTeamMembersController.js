const TeamMember = require("../../../models/teamMember");
const cloudinary = require("../../../config/cloudinary");

const updateTeamMembersController = async (req, res) => {
  try {
    const { updates } = req.body;

    const parsedUpdates =
      typeof updates === "string" ? JSON.parse(updates) : updates;

    if (!parsedUpdates || !Array.isArray(parsedUpdates) || parsedUpdates.length === 0) {
      return res.status(400).json({
        message: "Updates array is required",
      });
    }

    const updatedMembers = await Promise.all(
      parsedUpdates.map(async (item, index) => {
        let photoUrl = item.photo || "";

        // upload new image if provided
        if (req.files && req.files[index]) {
          const result = await cloudinary.uploader.upload(
            req.files[index].path,
            {
              folder: "teamMembers",
            }
          );

          photoUrl = result.secure_url;
        }

        return await TeamMember.findByIdAndUpdate(
          item.id,
          {
            photo: photoUrl,
            name: item.name,
            role: item.role,
            description: item.description,
          },
          {
            new: true,
            runValidators: true,
          }
        );
      })
    );

    res.status(200).json({
      message: "Team members updated successfully",
      updatedMembers,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = updateTeamMembersController;