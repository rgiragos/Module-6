// Import required packages and modules
const express = require('express');
const mongoose = require('mongoose');

// Create Express app
const app = express();

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create Mongoose models and schemas
const bankAccountSchema = new mongoose.Schema({
  accountNumber: {
    type: Number,
    required: [true, 'Account number is required'],
    unique: true,
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v);
      },
      message: (props) => `${props.value} is not a valid account number`,
    },
  },
  balance: {
    type: Number,
    required: [true, 'Balance is required'],
    min: [0, 'Balance cannot be negative'],
    max: [1000000, 'Balance cannot exceed 1 million'],
  },
});

const BankAccount = mongoose.model('BankAccount', bankAccountSchema);

// Create Express routes
app.post('/api/bankaccounts', async (req, res, next) => {
  try {
    const bankAccount = new BankAccount(req.body);
    await bankAccount.save();
    res.json(bankAccount);
  } catch (err) {
    next(err);
  }
});

// Custom error handling middleware for validation errors
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const errors = {};
    for (const field in err.errors) {
      errors[field] = err.errors[field].message;
    }
    return res.status(422).json({ errors });
  }
  next(err);
});

// Custom error handling middleware for other errors
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err.stack,
  });
});

// Start Express server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
