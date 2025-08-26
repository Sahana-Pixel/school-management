const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db'); // our DB connection
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Import routes
const schoolRoutes = require('./routes/school');
app.use('/', schoolRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
