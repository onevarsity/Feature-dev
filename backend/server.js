const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const dotenv = require('dotenv');


const postsRoutes = require('./routes/posts');
const healthRoutes = require('./routes/health');

const { errorHandler, notFound } = require('./middleware/errorHandler');
dotenv.config();
const connectDb = require('./db');

const app = express();

connectDb();

app.use(cors());
app.use(express.json());

app.use('/api/posts', postsRoutes);
app.use('/api/health', healthRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});