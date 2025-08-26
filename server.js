const express = require('express');
const db = require('./db');
const schoolRoutes = require('./routes/school');
const app = express();
const PORT = 3000;



// Middleware to parse JSON
app.use(express.json());

app.use('/', schoolRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
