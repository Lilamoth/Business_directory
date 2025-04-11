const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const connectDB = require('./config/db');
connectDB();

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
const businessRoutes = require('./routes/businessRoutes');
app.use('/api/businesses', businessRoutes);
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);
const financeRoutes = require('./routes/financeRoutes');
app.use('/api/finance', financeRoutes);
const messageRoutes = require('./routes/messageRoutes');
app.use('/api/messages', messageRoutes);
app.use('/api/activities', require('./routes/activityRoutes'));






const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
