// Import the Express module
const express = require('express');

// Create an instance of Express
const app = express();

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Define a route with parameters
app.get('/greet/:name', (req, res) => {
  const { name } = req.params;
  res.send(`Hello, ${name}!`);
});

// Define a route for handling POST requests
app.post('/submit', (req, res) => {
  res.send('Received a POST request');
});

// Start the server
const PORT = 3030;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});