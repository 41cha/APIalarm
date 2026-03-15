const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB підключено!'))
    .catch((err) => console.log('Помилка підключення:', err));

const alarmsRouter = require('./routes/alarms');
app.use('/api/alarms', alarmsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущено на порту ${PORT}`);
});