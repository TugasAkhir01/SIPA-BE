require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const violationRoutes = require('./routes/violationRoutes');
const reportRoutes = require('./routes/reports');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'https://sippak.up.railway.app',
  credentials: true // jika pakai cookie atau Authorization header
}));
app.use(express.json());

app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/report', express.static(path.join(__dirname, 'exports')));
app.use('/api', violationRoutes);

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
