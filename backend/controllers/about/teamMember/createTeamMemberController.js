const TeamMember = require("../../../models/teamMember");
const cloudinary = require("../../../config/cloudinary");

const createTeamMembersController = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);    
    let { members } = req.body;

    members =
      typeof members === "string"
        ? JSON.parse(members)
        : members;

    if (!members || !Array.isArray(members) || members.length === 0) {
      return res.status(400).json({
        message: "Members array is required",
      });
    }

    const createdMembersData = await Promise.all(
      members.map(async (member, index) => {
        if (!member.name || !member.role) {
          throw new Error("Name and role are required for each member");
        }

        let photoUrl = "";

        if (req.files && req.files[index]) {
          const result = await cloudinary.uploader.upload(
            req.files[index].path,
            {
              folder: "teamMembers",
            }
          );

          photoUrl = result.secure_url;
        }

        return {
          photo: photoUrl,
          name: member.name,
          role: member.role,
          description: member.description || "",
        };
      })
    );

    const createdMembers = await TeamMember.insertMany(createdMembersData);

    res.status(201).json({
      message: "Team members created successfully",
      createdMembers,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = createTeamMembersController;