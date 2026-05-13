const bcrypt = require("bcryptjs");
const Admin = require("../models/admin");

const createDefaultAdmin = async() => {
    try {
        const adminExists = await Admin.findOne();
        if(!adminExists) {
            const hashedPassword = await bcrypt.hash(`${process.env.ADMIN_PASSWORD}`, 10);

            await Admin.create({
                email: `${process.env.ADMIN_EMAIL}`,
                password: hashedPassword
            });
            console.log("Admin created");
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = createDefaultAdmin;