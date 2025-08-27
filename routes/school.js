const express = require('express');
const router = express.Router();
const pool = require('../db'); // Updated to pool

// Add School API
router.post('/addSchool', (req, res) => {
  const { name, address, latitude, longitude } = req.body;
  console.log("AddSchool endpoint hit");

  // Validation
  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);

  if (isNaN(lat) || isNaN(lon)) {
    return res.status(400).json({ error: 'Latitude and Longitude must be numbers' });
  }

  // Check if school already exists
  const checkSql = 'SELECT * FROM schools WHERE name = ? AND address = ?';
  pool.query(checkSql, [name, address], (err, results) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'School already exists' });
    }

    // Insert new school
    const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    pool.query(sql, [name, address, lat, lon], (err, result) => {
      if (err) {
        console.error('Database Error:', err);
        return res.status(500).json({ error: 'Database error', details: err.message });
      }

      res.status(201).json({
        message: 'School added successfully',
        schoolId: result.insertId
      });
    });
  });
});

// List Schools API
router.get('/listSchools', (req, res) => {
  const { latitude, longitude } = req.query;

  // Validation
  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'User latitude and longitude are required' });
  }
  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ error: 'Latitude and Longitude must be numbers' });
  }

  const sql = 'SELECT * FROM schools';
  pool.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching schools:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    // Function to calculate distance using Haversine formula
    function getDistance(lat1, lon1, lat2, lon2) {
      const R = 6371; // Radius of Earth in km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // Distance in km
    }

    // Add distance to each school
    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    const schoolsWithDistance = results.map(school => {
      const distance = getDistance(userLat, userLon, school.latitude, school.longitude);
      return {
        id: school.id,
        name: school.name,
        address: school.address,
        latitude: school.latitude,
        longitude: school.longitude,
        distance: distance.toFixed(2) + ' km'
      };
    });

    // Sort by distance
    schoolsWithDistance.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

    res.json(schoolsWithDistance);
  });
});

module.exports = router;
