const mongoose = require("mongoose")


async function connectToDb (){
    try {
        await mongoose.connect(process.env.MONGO_URL)
    console.log("Mongodb connected successfully ");
    } catch (error) {
        console.log("error on connect db : ", error);
        throw error;
    }
}


module.exports = connectToDb