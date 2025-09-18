const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const OPENWEATHER_KEY = process.env.OPENWEATHER_API_KEY;
const CITY = process.env.CITY || 'London';
const QUOTE_API = process.env.QUOTE_API || 'zenquotes'; // or 'apininjas'
const API_NINJAS_KEY = process.env.API_NINJAS_KEY;

// GET /api/external/weather
router.get('/weather', async (req, res) => {
  try {
    // Using OpenWeatherMap current weather endpoint (city name)
    // Docs: https://openweathermap.org/current
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(CITY)}&units=metric&appid=${OPENWEATHER_KEY}`;
    const resp = await axios.get(url);
    res.json(resp.data);
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(500).json({ error: 'Weather fetch failed' });
  }
});

// GET /api/external/quote
router.get('/quote', async (req, res) => {
  try {
    if (QUOTE_API === 'apininjas' && API_NINJAS_KEY) {
      const r = await axios.get('https://api.api-ninjas.com/v1/quotes', {
        headers: { 'X-Api-Key': API_NINJAS_KEY }
      });
      // response is array of quotes
      return res.json(r.data[0] || {});
    } else {
      // use ZenQuotes (no key required)
      // Example: https://zenquotes.io/api/random
      const r = await axios.get('https://zenquotes.io/api/random');
      // zenquotes returns [{ q: "...", a: "Author", h: "<b>..</b>" }]
      return res.json(r.data[0] || {});
    }
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(500).json({ error: 'Quote fetch failed' });
  }
});

module.exports = router;
