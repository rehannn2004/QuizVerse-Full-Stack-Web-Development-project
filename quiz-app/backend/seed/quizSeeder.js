require('dotenv').config();
const mongoose = require('mongoose');
const Quiz = require('../models/Quiz');
const connectDB = require('../config/db');

console.log('MONGO_URI:', process.env.MONGO_URI);

connectDB();
console.log("Connection state:", mongoose.connection.readyState);

const quizzes = [
  {
    subject: 'Math',
    questions: [
      {
        questionText: 'What is 2 + 2?',
        options: ['3', '4', '5', '6'],
        correctAnswer: 1,
      },
      {
        questionText: 'What is the square root of 16?',
        options: ['2', '4', '6', '8'],
        correctAnswer: 1,
      },
      {
        questionText: 'Solve for x: 2x + 3 = 7',
        options: ['1', '2', '3', '4'],
        correctAnswer: 1,
      },
      {
        questionText: 'What is the area of a square with side length 5?',
        options: ['10', '15', '20', '25'],
        correctAnswer: 3,
      },
      {
        questionText: 'What is 10 divided by 2?',
        options: ['2', '5', '10', '20'],
        correctAnswer: 1,
      },
    ],
  },
  {
    subject: 'Science',
    questions: [
      {
        questionText: 'What is the chemical symbol for water?',
        options: ['H2O', 'CO2', 'NaCl', 'O2'],
        correctAnswer: 0,
      },
      {
        questionText: 'Which planet is known as the Red Planet?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correctAnswer: 1,
      },
      {
        questionText: 'What is the largest organ in the human body?',
        options: ['Heart', 'Brain', 'Skin', 'Liver'],
        correctAnswer: 2,
      },
      {
        questionText: 'What force pulls objects toward the center of the Earth?',
        options: ['Magnetism', 'Gravity', 'Friction', 'Inertia'],
        correctAnswer: 1,
      },
      {
        questionText: 'What is the atomic number of oxygen?',
        options: ['6', '7', '8', '9'],
        correctAnswer: 2,
      },
    ],
  },
  {
    subject: 'History',
    questions: [
      {
        questionText: 'In which year did World War II end?',
        options: ['1943', '1945', '1947', '1950'],
        correctAnswer: 1,
      },
      {
        questionText: 'Who was the first President of the United States?',
        options: [
          'Thomas Jefferson',
          'George Washington',
          'Abraham Lincoln',
          'John Adams',
        ],
        correctAnswer: 1,
      },
      {
        questionText: 'The Industrial Revolution began in which country?',
        options: ['France', 'Germany', 'United States', 'Great Britain'],
        correctAnswer: 3,
      },
      {
        questionText: 'Who invented the telephone?',
        options: [
          'Thomas Edison',
          'Alexander Graham Bell',
          'Nikola Tesla',
          'Guglielmo Marconi',
        ],
        correctAnswer: 1,
      },
      {
        questionText: 'The Magna Carta was signed in which year?',
        options: ['1066', '1215', '1453', '1776'],
        correctAnswer: 1,
      },
    ],
  },
];


const importData = async () => {
  try {
    await Quiz.deleteMany();
    await Quiz.insertMany(quizzes);
    console.log('Data Imported!');
    process.exit(0); // Success exit code
  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1); // Error exit code
  }
};

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected - starting seed...');
  importData();
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});
importData();

