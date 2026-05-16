# School Management API

A simple REST API built with Node.js, Express.js, TypeScript, and PostgreSQL for managing school data.

## Features

- Add new schools
- Get schools sorted by nearest location
- Distance calculation using Haversine Formula

---

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MySQL

---

## Installation

```bash
git clone https://github.com/Subhammondal2004/School-Management
cd school-management
npm install
```

---

## Database Setup
Run this SQL query:

```sql
CREATE TABLE schools (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);
```

---

## Run Project

Development:
```bash
npm run dev
```

Production:
```bash
npm run build
npm start
```

---

## API Endpoints

### Add School

```http
POST-- https://school-management-pddb.onrender.com/api/v1/school/addschool
```

Request Body:

```json
{
  "name": "ABC School",
  "address": "Kolkata",
  "latitude": 22.5726,
  "longitude": 88.3639
}
```

---

### List Schools

```http
GET-- https://school-management-pddb.onrender.com/api/v1/school/listschools?latitude=20.352&longitude=98.541
```

---

## Deployment

- Backend: Render
- Database: Railway

---

## Author

Subham Mondal