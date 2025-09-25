const Chat = require('../models/Chat');
const User = require('../models/User');
const asyncHandler = require('../middlewares/async');

// @desc    Get all chat messages
// @route   GET /api/chat
// @access  Private
exports.getMessages = asyncHandler(async (req, res, next) => {
  const messages = await Chat.find().sort({ createdAt: -1 }).populate({
    path: 'user',
    select: 'name usn',
  });

  res.status(200).json({
    success: true,
    data: messages,
  });
});

// @desc    Create new chat message
// @route   POST /api/chat
// @access  Private
exports.createMessage = asyncHandler(async (req, res, next) => {
  // Validate input
  if (!req.body.message || typeof req.body.message !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Please provide a valid message'
    });
  }

  // Create message object
  const messageData = {
    user: req.user.id,
    message: req.body.message
  };

  // Create and populate in one query (Mongoose 6+ syntax)
  const message = await Chat.create(messageData);
  const populatedMessage = await Chat.findById(message._id)
    .populate({
      path: 'user',
      select: 'name usn'
    });

  res.status(201).json({
    success: true,
    data: populatedMessage
  });
});