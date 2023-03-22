const mongoose = require('mongoose');

const bankAccountSchema = new mongoose.Schema({
  accountNumber: {
    type: Number,
    required: true,
    unique: true,
    min: 100000,
    max: 999999,
    validate: {
      validator: function(v) {
        return /^[0-9]+$/.test(v);
      },
      message: props => `${props.value} is not a valid account number!`
    }
  },
  accountType: {
    type: String,
    required: true,
    enum: ['Savings', 'Checking']
  },
  balance: {
    type: Number,
    required: true,
    min: 0
  },
  owner: {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function(v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: props => `${props.value} is not a valid email address!`
      }
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return /^\d{10}$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      }
    }
  }
});

const BankAccount = mongoose.model('BankAccount', bankAccountSchema);

module.exports = BankAccount;
