const express = require('express');
const request = require('request');
const app = express();
const port = 3001;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    // Make a request to the API
    request('http://5c055de56b84ee00137d25a0.mockapi.io/api/v1/employees', (error, response, body) => {
        if (!error && response.statusCode === 200) {
            // Parse the JSON response
            const employees = JSON.parse(body);

            // Render the employee list along with details
            res.render('index', { employees });
        } else {
            // Handle error
            res.status(500).send('Error fetching employee data');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
