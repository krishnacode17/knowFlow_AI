const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const { validateRequest } = require("../validators/auth.validator")
const { createChatController, getAllChatsController, getSingleChatController, addMessageController, renameChatController, deleteChatController, deleteMessageController,  } = require("../controllers/chat.controller")
const { createChatValidator, addMessageValidator, renameChatValidator, deleteChatValidator, deleteMessageValidator, getSingleChatValidator } = require("../validators/chat.validator")
const { streamChatController } = require("../controllers/chatStream.controller")

const chatRoutes = express.Router()

 
chatRoutes.post("/", authMiddleware , createChatValidator , validateRequest , createChatController)
chatRoutes.get("/" , authMiddleware, getAllChatsController)
chatRoutes.get("/:chatId" , authMiddleware,getSingleChatValidator , validateRequest , getSingleChatController)
chatRoutes.post("/:chatId/messages" , authMiddleware, addMessageValidator , validateRequest, addMessageController)
chatRoutes.patch("/:chatId", authMiddleware , renameChatValidator , validateRequest , renameChatController)
chatRoutes.delete("/:chatId", authMiddleware , deleteChatValidator, validateRequest , deleteChatController)
chatRoutes.delete("/:chatId/messages/:messageId", authMiddleware , deleteMessageValidator, validateRequest , deleteMessageController)

chatRoutes.post("/:chatId/messages/stream",authMiddleware , streamChatController)

module.exports = chatRoutes