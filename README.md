# Arrive Full Stack

Travel booking app with a Vite React frontend and a Node.js, Express, MongoDB backend.

## Run Backend

```bash
cd backend
npm install
npm run dev
```

Backend URL:

```text
http://localhost:5000
```

MongoDB connection:

```env
MONGODB_URI=mongodb://localhost:27017/
MONGODB_DB=arrive
```

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

Frontend API config:

```env
VITE_API_URL=http://localhost:5000
```

## Postman

Import:

```text
backend/postman/Arrive Backend.postman_collection.json
```

Use `http://localhost:5000` as the `baseUrl`.

Do not commit local `.env` files. Use `.env.example` files as templates.

## Vercel Frontend

Create one Vercel project for the frontend.

Project settings:

```text
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

Environment variable:

```env
VITE_API_URL=https://YOUR_BACKEND_VERCEL_URL
```

After the frontend deploys, copy its Vercel domain and use it as the backend `CORS_ORIGIN`.

## Vercel Backend

Create a second Vercel project for the backend.

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

For Vercel, use MongoDB Atlas instead of `mongodb://localhost:27017/`, because Vercel cannot connect to your local computer database.

Backend test URL:

```text
https://YOUR_BACKEND_VERCEL_URL/api/health
```
