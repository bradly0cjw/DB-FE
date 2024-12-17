const express = require('express');
const { swaggerUi, specs } = require('./swagger');
const routes = require('./routes');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Use Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Redirect root URL to /api-docs
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Use routes
app.use('/', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Simple ping request
app.get('/ping', (req, res) => {
  res.send('pong');
});