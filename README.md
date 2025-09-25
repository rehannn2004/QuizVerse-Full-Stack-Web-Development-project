# QuizVerse - Interactive Quiz Platform

QuizVerse is a full-stack web application developed as a course project for Web Technologies, integrated with Software Engineering principles. It provides a centralized platform for students to take quizzes, track their performance, and engage in academic discussions.

## Features

- **User Authentication**: Secure user registration and login using JWT (JSON Web Tokens).
- **Subject-Wise Quizzes**: Attempt quizzes on various subjects. Each quiz consists of 5 MCQs.
- **Real-Time Scoring**: Immediate calculation and display of scores upon quiz submission.
- **Leaderboard**: A dynamic leaderboard that displays the top scorers for each subject based on their best attempt.
- **Doubt Discussion Forum**: A public chat interface where users can post questions and view past conversations with timestamps.
- **Responsive Design**: A user-friendly interface built to work seamlessly across different devices.

## Tech Stack

- **Frontend**: React, HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)

## Installation & Setup

### Prerequisites
- Node.js and npm installed on your machine
- MongoDB database (local or cloud-based like MongoDB Atlas)

### Setup 

```bash
cd server
npm install

# Create a .env file and add your variables:
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret_key

npm start

cd client
npm install
npm start

### Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
