# School Management API

## Overview

The School Management API is a RESTful service built with Node.js, Express.js, and MySQL. It allows users to:

- Add new schools with details like name, address, latitude, and longitude.
- Retrieve a list of schools sorted by proximity to a specified location.

This project demonstrates handling geolocation-based data and building scalable APIs using modern JavaScript technologies.

---

## 🚀 Live APIs

- **Add School**: [https://school-management-1-waww.onrender.com/addSchool](https://school-management-1-waww.onrender.com/addSchool)  
- **List Schools**: [https://school-management-1-waww.onrender.com/listSchools?latitude=10.9716&longitude=80.5946](https://school-management-1-waww.onrender.com/listSchools?latitude=10.9716&longitude=80.5946)

---

## 🛠️ Technologies Used

- **Node.js** – JavaScript runtime  
- **Express.js** – Web framework for Node.js  
- **MySQL** – Relational database  
- **Haversine Formula** – For calculating geographical distances  

---

## 📦 Installation

To run this project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/Sahana-Pixel/school-management.git
   cd school-management-api

Install dependencies:
npm install

Set up your MySQL database:
Create a database named school_management.

Create a table named schools with the following schema:
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);


Update the .env file with your MySQL credentials:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=school_management
PORT=5000

Start the server:
npm start

The API will be running at http://localhost:5000.

📡 API Endpoints
1. Add School
Endpoint: POST /addSchool
Description: Adds a new school to the database.

Request Body:
{
  "name": "XYZ School",
  "address": "123 Main St, City",
  "latitude": 12.9716,
  "longitude": 77.5946
}
Response:
{
  "message": "School added successfully",
  "schoolId": 1
}
Live API URL: https://school-management-1-waww.onrender.com/addSchool

2. List Schools
Endpoint: GET /listSchools
Query Parameters:
latitude: Latitude of the user's location.
longitude: Longitude of the user's location.
Description: Retrieves a list of schools sorted by proximity to the specified location.

Example Request (Live API):
GET https://school-management-1-waww.onrender.com/listSchools?latitude=10.9716&longitude=80.5946

Example Response:
[
  {
    "id": 1,
    "name": "ABC School",
    "address": "456 Elm St, City",
    "latitude": 10.9720,
    "longitude": 80.5950,
    "distance": 0.25
  },
  {
    "id": 2,
    "name": "XYZ School",
    "address": "123 Main St, City",
    "latitude": 10.9716,
    "longitude": 80.5946,
    "distance": 0.00
  }
]
The distance is calculated using the Haversine formula and is in kilometers.

