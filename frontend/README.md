# Smart Appointment Scheduling System

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### Frontend
- React.js
- Axios
- React Router DOM

---

## Features

- User Registration
- User Login
- JWT Authentication
- View Appointment Slots
- Book Appointment
- View My Appointments
- Cancel Appointment
- One Appointment Per Day Restriction
- Prevent Concurrent Booking
- Seeded Appointment Slots

---

## Installation

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file inside the backend folder.

```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/smart_appointment
JWT_SECRET=your_secret_key
```

---

## API Endpoints

### Authentication

- POST /api/auth/register
- POST /api/auth/login

### Appointments

- GET /api/appointments
- POST /api/appointments/:id/book
- GET /api/appointments/my
- DELETE /api/appointments/:id

---

## Assumptions

- Appointment slots are automatically seeded when the server starts.
- A user can book only one appointment per day.
- A slot can be booked by only one user.
- JWT is required for protected APIs.

---

## Author

Hem Singh Dhoni