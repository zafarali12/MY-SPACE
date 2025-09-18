const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const dataFile = path.join(__dirname, '..', 'data', 'note.json');

// ensure data file exists
if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, JSON.stringify({ note: '' }, null, 2));

router.get('/', (req, res) => {
  const raw = fs.readFileSync(dataFile);
  const obj = JSON.parse(raw);
  res.json(obj);
});

router.post('/', (req, res) => {
  const { note } = req.body;
  fs.writeFileSync(dataFile, JSON.stringify({ note: note || '' }, null, 2));
  res.json({ success: true, note });
});

module.exports = router;
