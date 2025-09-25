const express = require('express');
const {
  getMessages,
  createMessage,
} = require('../controllers/chatController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.route('/').get(protect, getMessages).post(protect, createMessage);

module.exports = router;