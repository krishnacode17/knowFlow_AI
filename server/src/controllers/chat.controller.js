const { default: mongoose } = require("mongoose");
const Chat = require("../models/chat.model");
const Message = require("../models/message.model");
const aiService = require("../services/ai");

const createChatController = async (req, res, next) => {
  try {
    const chat = await Chat.create({
      userId: req.userId,
      title: req.body.title,
    });

    return res.status(201).json({
      success: true,
      message: "Chat created successfully",
      chat,
    });
  } catch (error) {
    next(error);
  }
};

const getAllChatsController = async (req, res, next) => {
  try {
    const chats = await Chat.find({ userId: req.userId })
      .sort({ updatedAt: -1 })
      .select("_id title createdAt updatedAt ")
      .lean();

    return res.status(200).json({
      success: true,
      message: "Chats fetched successfully",
      count: chats.length,
      chats,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleChatController = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const { before } = req.query;

    const chat = await Chat.findOne({
      _id: chatId,
      userId: req.userId,
    })
      .select("_id title createdAt updatedAt")
      .lean();

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    const messageFilter = {
      chatId: chat._id,
      userId: req.userId,
    };

    if (before) {
      const cursorMessage = await Message.findOne({
        _id: before,
        chatId: chat._id,
        userId: req.userId,
      })
        .select("_id createdAt")
        .lean();

      if (!cursorMessage) {
        return res.status(400).json({
          success: false,
          message: "Invalid message cursor",
        });
      }

      $or = [
        { createdAt: { $lt: cursorMessage.createdAt } },
        {
          createdAt: cursorMessage.createdAt,
          _id: { $lt: cursorMessage._id },
        },
      ];
    }

    const fetchedMessages = await Message.find(messageFilter)
      .sort({ createdAt: -1, _id: -1 })
      .limit(51)
      .lean();

    const hasMore = fetchedMessages.length > 50;

    const messages = fetchedMessages.slice(0, 50).reverse();

    return res.status(200).json({
      success: true,
      message: "Chat fetched successfully",
      chat,
      messages,
      hasMore,
      nextCursor: hasMore ? messages[0]._id : null,
    });
  } catch (error) {
    next(error);
  }
};

const addMessageController = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const { content } = req.body;
    const userId = req.userId;

    // 1. Verify chat ownership
    const chat = await Chat.findOne({
      _id: chatId,
      userId,
    }).select("_id");

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    // 2. Save user's message
    const userMessage = await Message.create({
      chatId: chat._id,
      userId,
      role: "user",
      content,
    });

    // 3. Fetch recent conversation history
    const history = await Message.find({
      chatId: chat._id,
      userId,
    })
      .sort({ createdAt: -1, _id: -1 })
      .limit(20)
      .lean();

    // Reverse into chronological order for the LLM
    history.reverse();

    // 4. Convert database messages to LangChain messages
    const messages = history.map((message) => [
      message.role === "assistant" ? "ai" : "human",
      message.content,
    ]);

    // 5. Generate AI response

    let aiResponse;
    try {
      aiResponse = await aiService.generateResponse(messages);
    } catch (error) {
      const errorMessage = error.message || "";

      let statusCode = 503;
      let message = "AI service is temporarily unavailable. Please try again.";

      if (
        errorMessage.includes("401") ||
        errorMessage.includes("invalid_api_key")
      ) {
        statusCode = 500;
        message = "AI service configuration error.";
      } else if (
        errorMessage.includes("429") ||
        errorMessage.includes("rate_limit_exceeded")
      ) {
        statusCode = 429;
        message = "AI service rate limit exceeded. Please try again later.";
      } else if (
        error.name === "AbortError" ||
        error.name === "TimeoutError" ||
        errorMessage.toLowerCase().includes("timeout")
      ) {
        statusCode = 504;
        message = "AI response timed out. Please try again.";
      }

      console.error("Groq API error:", {
        message: errorMessage,
        name: error.name,
        statusCode,
      });

      const aiError = new Error(message);
      aiError.statusCode = statusCode;

      return next(aiError);
    }

    const aiContent =
      typeof aiResponse.content === "string"
        ? aiResponse.content
        : JSON.stringify(aiResponse.content);

    // 6. Save AI response
    const assistantMessage = await Message.create({
      chatId: chat._id,
      userId,
      role: "assistant",
      content: aiContent,
    });

    // 7. Update chat activity
    await Chat.updateOne(
      { _id: chat._id, userId },
      { $set: { updatedAt: new Date() } },
    );

    // 8. Return both messages
    return res.status(201).json({
      success: true,
      message: "AI response generated successfully",
      data: {
        userMessage: {
          _id: userMessage._id,
          chatId: userMessage.chatId,
          role: userMessage.role,
          content: userMessage.content,
          createdAt: userMessage.createdAt,
        },
        assistantMessage: {
          _id: assistantMessage._id,
          chatId: assistantMessage.chatId,
          role: assistantMessage.role,
          content: assistantMessage.content,
          createdAt: assistantMessage.createdAt,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const renameChatController = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const { title } = req.body;

    const chat = await Chat.findOneAndUpdate(
      {
        _id: chatId,
        userId: req.userId,
      },
      {
        $set: { title: title.trim() },
      },
      {
        new: true,
        runValidators: true,
      },
    ).select("_id title createdAt updatedAt");

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Chat renamed successfully",
      chat,
    });
  } catch (error) {
    next(error);
  }
};

const deleteChatController = async (req, res, next) => {
  const session = await Chat.startSession();

  try {
    const { chatId } = req.params;

    console.log("this is chatId : ", chatId);

    await session.withTransaction(async () => {
      const chat = await Chat.findOneAndDelete(
        {
          _id: chatId,
          userId: req.userId,
        },
        { session },
      );

      if (!chat) {
        const error = new Error("Chat not found");
        error.statusCode = 404;
        throw error;
      }

      await Message.deleteMany(
        {
          chatId: chat._id,
          userId: req.userId,
        },
        { session },
      );
    });

    return res.status(200).json({
      success: true,
      message: "Chat and its messages deleted successfully",
    });
  } catch (error) {
    if (error.statusCode === 404) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    next(error);
  } finally {
    await session.endSession();
  }
};

const deleteMessageController = async (req, res, next) => {
  try {
    const { chatId, messageId } = req.params;
    const userId = req.userId;

    // 1. Verify chat ownership
    const chat = await Chat.findOne({
      _id: chatId,
      userId,
    }).select("_id");

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    // 2. Find and delete only the message
    // belonging to this chat and user
    const message = await Message.findOneAndDelete({
      _id: messageId,
      chatId: chat._id,
      userId,
    });

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    // 3. Update chat's activity timestamp
    await Chat.updateOne(
      { _id: chat._id, userId },
      { $set: { updatedAt: new Date() } },
    );

    return res.status(200).json({
      success: true,
      message: "Message deleted successfully",
      data: {
        messageId: message._id,
        chatId: message.chatId,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createChatController,
  getAllChatsController,
  getSingleChatController,
  addMessageController,
  renameChatController,
  deleteChatController,
  deleteMessageController,
};
