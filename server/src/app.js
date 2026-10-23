const express = require("express")
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const chatRoutes = require("./routes/chat.routes");
const app = express()

app.use(express.json())
app.use(cookieParser())


app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/chats",chatRoutes)



module.exports = app