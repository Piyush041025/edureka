const express = require('express');
const app = express();
const port = 3000;

// Endpoint to render JSON data
app.get('/data', (req, res) => {
    // Assume data.json contains the JSON data
    const jsonData = require('./data.json');
    res.json(jsonData);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
