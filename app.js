const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subCategoryRoutes = require('./routes/subCategoryRoutes');
const productRoutes = require('./routes/productRoutes');

const globalHandleError = require('./controllers/errorControllers');
const express = require('express');

const app = express();
app.use(express.json());

app.use('/api/v1/user', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/subCategory', subCategoryRoutes);
app.use('/api/v1/product', productRoutes);

app.use(globalHandleError);
module.exports = app;
