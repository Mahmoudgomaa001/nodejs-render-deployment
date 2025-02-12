const express = require('express');
const axios = require('axios'); // Import axios
const app = express();
const PORT = process.env.PORT || 3000;

// URL of your Google Apps Script web app
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwV7C46lOjQdQU_p_zy8-Jeyd4SEIDrMy0niXEhZNxAMwcC9ldQKXMIsYE0bxNNKAM_/exec?action=get';

// Function to fetch the redirect URL from Google Apps Script
async function getRedirectUrl() {
  try {
    const response = await axios.get(GOOGLE_SCRIPT_URL);
    return response.data; // The URL from cell A2
  } catch (error) {
    console.error('Error fetching redirect URL:', error.message);
    return 'https://www.example.com'; // Fallback URL
  }
}

// Middleware to handle all requests
app.get('*', async (req, res) => {
  const redirectUrl = await getRedirectUrl(); // Fetch the URL dynamically
  res.redirect(301, redirectUrl); // Redirect to the fetched URL
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});