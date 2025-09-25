const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, contactNumber, usn, password } = req.body;

  // Create user
  const user = await User.create({
    name,
    email,
    contactNumber,
    usn,
    password,
  });

  sendTokenResponse(user, 200, res);
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token - ensure this matches your User model method
  const token = user.getSignedJwtToken();

  // Cookie options
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' // Added for security
  };

  // Remove sensitive data
  user.password = undefined;
  user.__v = undefined; // Remove version key if using Mongoose

  // Send response
  res.status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token, // Important: Frontend expects this
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        contactNumber: user.contactNumber, // Added missing field
        usn: user.usn,
        createdAt: user.createdAt // Optional: Include if needed
      }
    });
};