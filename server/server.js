require("dotenv/config")
const app = require("./src/app")
const connectToDb = require("./src/DB/db")



const PORT = process.env.PORT || 5000
connectToDb()



app.listen(PORT ,()=>{
    console.log("Server is running on PORT : ", PORT);
}) 