console.log('Server is starting...');
const cors = require('cors');
const express = require('express');
const Transaction = require('./models/transaction');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());


app.use(express.json());
app.get('/api/test', (req, res) => {
    res.json({
        body: 'test ok'
    })
})

app.post('/api/transaction', async(req, res) => {
    console.log('url', process.env.MONGO_URL)
    await mongoose.connect(process.env.MONGO_URL);
    const { name, price, datetime, description } = req.body;
    const transaction = await Transaction.create({ name, price, datetime, description });

    res.json(transaction);
})

app.get('/api/transactions', async(req, res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const transactions = await Transaction.find();
    res.json(transactions);
})

app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});