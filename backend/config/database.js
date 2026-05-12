const mongoose = require('mongoose')


const connectDB = async() => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("DB connnected");
        })
        await mongoose.connect(`${process.env.MONGODB_URI}/DESAM`)
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;
