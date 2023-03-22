const express = require('express');
const mongoose = require('mongoose');
const BankAccount = require('./models/BankAccount');

const app = express();

mongoose.connect('mongodb://localhost:27017/bank', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB!');
}).catch(err => {
  console.log('Error connecting to MongoDB:', err);
});

app.use(express.json());

app.get('/bankaccounts', async (req, res) => {
  try {
    const bankAccounts = await BankAccount.find();
    res.json(bankAccounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/bankaccounts/:id', getBankAccount, (req, res) => {
  res.json(res.bankAccount);
});

app.post('/bankaccounts', async (req, res) => {
  const bankAccount = new BankAccount({
    accountNumber: req.body.accountNumber,
    accountType: req.body.accountType,
    balance: req.body.balance,
owner: {
firstName: req.body.owner.firstName,
lastName: req.body.owner.lastName,
email: req.body.owner.email,
phone: req.body.owner.phone
}
});

try {
const newBankAccount = await bankAccount.save();
res.status(201).json(newBankAccount);
} catch (err) {
res.status(400).json({ message: err.message });
}
});

app.patch('/bankaccounts/:id', getBankAccount, async (req, res) => {
if (req.body.accountNumber != null) {
res.bankAccount.accountNumber = req.body.accountNumber;
}
if (req.body.accountType != null) {
res.bankAccount.accountType = req.body.accountType;
}
if (req.body.balance != null) {
res.bankAccount.balance = req.body.balance;
}
if (req.body.owner != null) {
if (req.body.owner.firstName != null) {
res.bankAccount.owner.firstName = req.body.owner.firstName;
}
if (req.body.owner.lastName != null) {
res.bankAccount.owner.lastName = req.body.owner.lastName;
}
if (req.body.owner.email != null) {
res.bankAccount.owner.email = req.body.owner.email;
}
if (req.body.owner.phone != null) {
res.bankAccount.owner.phone = req.body.owner.phone;
}
}

try {
const updatedBankAccount = await res.bankAccount.save();
res.json(updatedBankAccount);
} catch (err) {
res.status(400).json({ message: err.message });
}
});

app.delete('/bankaccounts/:id', getBankAccount, async (req, res) => {
try {
await res.bankAccount.remove();
res.json({ message: 'Bank account deleted successfully!' });
} catch (err) {
res.status(500).json({ message: err.message });
}
});

async function getBankAccount(req, res, next) {
try {
const bankAccount = await BankAccount.findById(req.params.id);
if (bankAccount == null) {
return res.status(404).json({ message: 'Bank account not found!' });
}
res.bankAccount = bankAccount;
next();
} catch (err) {
res.status(500).json({ message: err.message });
}
}

app.listen(3000, () => {
console.log('Server started on port 3000!');
});