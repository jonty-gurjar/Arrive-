# Arrive Backend

Node.js, Express, and MongoDB API for the Arrive travel frontend.

## Requirements

- Node.js 18+
- MongoDB running locally or a MongoDB Atlas connection string
- Postman for API testing

## Setup

```bash
cd backend
npm install
```

Create your environment file:

```bash
Copy-Item .env.example .env
```

Default `.env` values:

```env
PORT=5000
CORS_ORIGIN=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/
MONGODB_DB=arrive
```

For MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string.

## Run

```bash
npm run dev
```

API base URL:

```text
http://localhost:5000
```

The frontend should use:

```env
VITE_API_URL=http://localhost:5000
```

## API Endpoints

- `GET /`
- `GET /api/health`
- `GET /api/packages`
- `GET /api/packages?q=goa&packageType=Family&flight=With%20Flight&theme=Beach&sortBy=price-low-to-high`
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/bookings`
- `GET /api/bookings`
- `GET /api/bookings/:id`

## Postman

Import this file into Postman:

```text
postman/Arrive Backend.postman_collection.json
```

The collection uses:

```text
baseUrl = http://localhost:5000
```

Run order for a full test:

1. Health Check
2. Get Packages
3. Signup
4. Login
5. Create Booking
6. Get Bookings
7. Get Booking By ID

The Create Booking request stores `bookingId` automatically for the Get Booking By ID request.

## Vercel Deploy

Deploy this `backend` folder as its own Vercel project.

Project settings:

```text
Framework Preset: Other
Root Directory: backend
Install Command: npm install
```

Environment variables:

```env
MONGODB_URI=mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=arrive
CORS_ORIGIN=https://YOUR_FRONTEND_VERCEL_URL
```

Use MongoDB Atlas for deployment. `mongodb://localhost:27017/` only works on your local computer.

The Vercel entry point is:

```text
api/index.js
```

## Example Requests

```bash
curl http://localhost:5000/api/packages
```

```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Alex Morgan\",\"email\":\"alex@example.com\",\"password\":\"secret123\"}"
```

```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d "{\"packageId\":\"beach-escape-bali\",\"location\":\"Bali, Indonesia\",\"date\":\"2026-08-15\",\"guests\":\"2 People\",\"name\":\"Alex Morgan\",\"email\":\"alex@example.com\"}"
```
