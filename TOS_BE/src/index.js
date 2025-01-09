const express = require('express');
const cors = require('cors');
const { swaggerUi, specs } = require('./swagger');
const routes = require('./routes');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Use CORS middleware
const API_URL = process.env.API_URL || 'http://localhost:3000';
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:8080', 'http://localhost:5173'];
console.log('Allowed origins:', allowedOrigins);
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || API_URL === origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization',
  exposedHeaders: 'Content-Type,Authorization'
}));

// Set Access-Control-Allow-Origin header for all responses
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

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