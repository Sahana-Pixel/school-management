# School Management API

This project is a **Node.js** and **Express.js** based API for managing schools. It allows users to add new schools and retrieve a list of schools sorted by proximity to a user-specified location. The data is stored in a **MySQL** database.

---

## 📂 Features

- Add a new school with name, address, latitude, and longitude.
- List all schools sorted by distance from a given location.
- Input validation for all API requests.
- Easy to deploy and test using Postman.

---

## 🛠️ Technologies Used

- **Node.js**
- **Express.js**
- **MySQL** (Database)
- **dotenv** (Environment variable management)
- **Nodemon** (Development server)
- **Postman** (API testing)

---

## 📦 Project Setup

### 1. Clone the repository
```bash
git clone https://github.com/Sahana-Pixel/school-management.git
cd school-management-api

2. Install dependencies
npm install

3. Setup environment variables
Create a .env file in the root directory and add your MySQL configuration:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=school_db
PORT=3000

4. Run the server
npm run dev
The server will start at http://localhost:3000

📌 API Endpoints

1. Add School
Endpoint: /addSchool
Method: POST
Payload:
{
  "name": "ABC School",
  "address": "123 Main St",
  "latitude": 12.9716,
  "longitude": 77.5946
}
Response:
{
  "message": "School added successfully",
  "schoolId": 1
}

2. List Schools
Endpoint: /listSchools
Method: GET
Query Parameters:
latitude (user latitude)
longitude (user longitude)

Response:
[
  {
    "id": 1,
    "name": "ABC School",
    "address": "123 Main St",
    "distance": "2.5 km"
  },
  {
    "id": 2,
    "name": "XYZ School",
    "address": "456 Park Ave",
    "distance": "4.1 km"
  }
]

📌 Distance Calculation
Distance is calculated using the Haversine formula to determine the proximity between the user and each school.
