const { default: mongoose } = require("mongoose");
const Chat = require("../models/chat.model");
const Message = require("../models/message.model");

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

    // Verify that this chat belongs to the logged-in user
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

    // Save the user's message
    const message = await Message.create({
      chatId: chat._id,
      userId,
      role: "user",
      content,
    });

    // Update chat activity so it appears first in the chat list
    await Chat.updateOne(
      { _id: chat._id, userId },
      { $set: { updatedAt: new Date() } },
    );

    return res.status(201).json({
      success: true,
      message: "Message saved successfully",
      data: {
        _id: message._id,
        chatId: message.chatId,
        role: message.role,
        content: message.content,
        createdAt: message.createdAt,
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
      }
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
        { session }
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
        { session }
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
      { $set: { updatedAt: new Date() } }
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
  deleteMessageController
};
