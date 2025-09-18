require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const noteRoutes = require('./routes/note');
const externalRoutes = require('./routes/external');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/note', noteRoutes);
app.use('/api/external', externalRoutes);

// static serve frontend in production (optional)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));
  app.get('*', (req,res) => res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
