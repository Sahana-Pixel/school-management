const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /addSchool
router.post('/addSchool', (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  // Basic validation
  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
  db.query(query, [name, address, latitude, longitude], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });
  });
});

module.exports = router;

// GET /listSchools?latitude=...&longitude=...
router.get('/listSchools', (req, res) => {
  const userLat = parseFloat(req.query.latitude);
  const userLng = parseFloat(req.query.longitude);

  if (!userLat || !userLng) {
    return res.status(400).json({ message: 'User latitude and longitude are required' });
  }

  // Fetch all schools
  const query = 'SELECT * FROM schools';
  db.query(query, (err, schools) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }

    // Calculate distance using Haversine formula
    const schoolsWithDistance = schools.map((school) => {
      const R = 6371; // Earth's radius in km
      const dLat = (school.latitude - userLat) * (Math.PI / 180);
      const dLng = (school.longitude - userLng) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(userLat * (Math.PI / 180)) *
        Math.cos(school.latitude * (Math.PI / 180)) *
        Math.sin(dLng / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      return { ...school, distance: distance.toFixed(2) + ' km' };
    });

    // Sort by distance
    schoolsWithDistance.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

    res.json(schoolsWithDistance);
  });
});
