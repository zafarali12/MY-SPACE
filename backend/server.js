
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const noteRoutes = require('./routes/note');
const externalRoutes = require('./routes/external');

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/note', noteRoutes);
app.use('/api/external', externalRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
