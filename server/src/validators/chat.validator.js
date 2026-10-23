
const { body, param , query} = require("express-validator");

const createChatValidator = [
  body("title")
    .optional()
    .isString()
    .withMessage("Chat title must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Chat title cannot be empty")
    .bail()
    .isLength({ max: 100 })
    .withMessage("Chat title cannot exceed 100 characters"),
];


const addMessageValidator = [
  param("chatId")
    .isMongoId()
    .withMessage("Invalid chat ID"),

  body("content")
    .isString()
    .withMessage("Message must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Message cannot be empty")
    .bail()
    .isLength({ max: 50000 })
    .withMessage("Message cannot exceed 50000 characters"),
];


const getSingleChatValidator = [
  param("chatId")
    .isMongoId()
    .withMessage("Invalid chat ID"),

  query("before")
    .optional()
    .isMongoId()
    .withMessage("Invalid message cursor"),
];


const renameChatValidator = [
  param("chatId")
    .isMongoId()
    .withMessage("Invalid chat ID"),

  body("title")
    .isString()
    .withMessage("Chat title must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Chat title cannot be empty")
    .bail()
    .isLength({ max: 100 })
    .withMessage("Chat title cannot exceed 100 characters"),
];

const deleteChatValidator = [
  param("chatId")
    .isMongoId()
    .withMessage("Invalid chat ID"),
];

const deleteMessageValidator = [
  param("chatId")
    .isMongoId()
    .withMessage("Invalid chat ID"),

  param("messageId")
    .isMongoId()
    .withMessage("Invalid message ID"),
];



module.exports = {
  createChatValidator,
  addMessageValidator,
  getSingleChatValidator,
  renameChatValidator,
  deleteChatValidator,
  deleteMessageValidator
};
