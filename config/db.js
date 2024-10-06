const mongoose = require('mongoose');

const connectToDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL) 
        console.log("backend server connected to MongoDB.")
    } catch(error) {
        console.log(error);
    }
}

module.exports = connectToDB;