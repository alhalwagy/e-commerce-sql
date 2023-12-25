const authRoutes = require('./routes/authRoutes');
const globalHandleError = require('./controllers/errorControllers');
const express = require('express');

const app = express();
app.use(express.json());

app.use('/api/v1/user', authRoutes);

app.use(globalHandleError);
module.exports = app;
