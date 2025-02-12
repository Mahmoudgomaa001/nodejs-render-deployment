const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// The URL to which you want to redirect users
const REDIRECT_URL = process.env.REDIRECT_URL || 'https://www.example.com';

app.get('*', (req, res) => {
  res.redirect(301, REDIRECT_URL);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});