const Chat = require("../models/chat.model");
const Message = require("../models/message.model");
const aiService = require("../services/ai");

const streamChatController = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const { content } = req.body;
    const userId = req.userId;

    const chat = await Chat.findOne({
      _id: chatId,
      userId,
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    // Save user's message first
    await Message.create({
      chatId,
      userId,
      role: "user",
      content,
    });

    // Load recent conversation history
    const history = await Message.find({ chatId, userId })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    history.reverse();

    const messages = history.map((message) => ({
      role: message.role === "assistant" ? "ai" : "human",
      content: message.content,
    }));

    // Start SSE response
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    const abortController = new AbortController();
    let clientDisconnected = false;

    res.on("close", () => {
      if (!res.writableEnded) {
        clientDisconnected = true;
        abortController.abort();
      }
    });

    let fullResponse = "";

    //  AI response in stream formet
    const stream = await aiService.streamResponse(
      messages,
      abortController.signal,
    );

    for await (const chunk of stream) {
      if (clientDisconnected) {
        break;
      }

      const text = typeof chunk.content === "string" ? chunk.content : "";

      if (!text) continue;

      fullResponse += text;

      res.write(
        `data: ${JSON.stringify({ type: "chunk", content: text })}\n\n`,
      );
    }

    // Save the complete AI response once
    if (fullResponse) {
      await Message.create({
        chatId,
        userId,
        role: "assistant",
        content: fullResponse,
      });
    }

    await Chat.updateOne(
      { _id: chatId, userId },
      { $set: { updatedAt: new Date() } },
    );

    res.write(`data: ${JSON.stringify({ type: "done" })}\n\n`);
    res.end();
  } catch (error) {
    if (clientDisconnected || res.destroyed) {
      return;
    }

    console.error("STREAMING ERROR:", error);

    if (res.headersSent) {
      if (!res.writableEnded) {
        res.write(
          `data: ${JSON.stringify({
            type: "error",
            message: "AI response failed",
          })}\n\n`,
        );
        return res.end();
      }
      return;
    }

    next(error);
  }
};

module.exports = {
  streamChatController,
};
