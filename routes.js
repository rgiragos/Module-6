app.post('/bank-accounts', async (req, res) => {
    try {
      const bankAccount = new BankAccount(req.body);
      await bankAccount.save();
      res.status(201).send(bankAccount);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  app.get('/bank-accounts', async (req, res) => {
    try {
      const bankAccounts = await BankAccount.find();
      res.send(bankAccounts);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  app.get('/bank-accounts/:id', async (req, res) => {
    try {
      const bankAccount = await BankAccount.findById(req.params.id);
      if (!bankAccount) {
        return res.status(404).send();
      }
      res.send(bankAccount);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  app.put('/bank-accounts/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['accountNumber', 'balance', 'owner', 'transactions'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }
    try {
      const bankAccount = await BankAccount.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!bankAccount) {
        return res.status(404).send();
      }
      res.send(bankAccount);
    } catch (error) {
      res.status(400).send(error);
    }
  });
app.delete('/bank-accounts/:id', async (req, res) => {
  try {
    const bankAccount = await BankAccount.findByIdAndDelete(req.params.id);
    if (!bankAccount) {
      return res.status(404).send();
    }
    res.send(bankAccount);
  } catch (error) {
    res.status(500).send(error);
  }
});
      