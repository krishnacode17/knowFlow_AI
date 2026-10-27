const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const chatRoutes = require("./routes/chat.routes");
const errorMiddleware = require("./middlewares/error.middleware");
const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))



app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/chats",chatRoutes)


app.use(errorMiddleware)
module.exports = app