import "dotenv/config";
import express from "express";
import cors from "cors";
import { pbkdf2Sync, randomBytes, timingSafeEqual } from "node:crypto";
import { fileURLToPath } from "node:url";
import { ObjectId } from "mongodb";
import { connectDatabase, getDatabase } from "./db.js";
import { packages } from "./packages.js";

const app = express();
const port = Number(process.env.PORT || 5000);
const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

function publicUser(user) {
  return {
    id: user._id?.toString(),
    name: user.name,
    email: user.email,
    createdAt: user.createdAt
  };
}

function publicBooking(booking) {
  return {
    id: booking._id?.toString(),
    packageId: booking.packageId,
    packageTitle: booking.packageTitle,
    location: booking.location,
    date: booking.date,
    guests: booking.guests,
    name: booking.name,
    email: booking.email,
    notes: booking.notes,
    status: booking.status,
    createdAt: booking.createdAt
  };
}

function hashPassword(password, salt = randomBytes(16).toString("hex")) {
  const hash = pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, storedPassword) {
  const [salt, storedHash] = String(storedPassword).split(":");

  if (!salt || !storedHash) {
    return false;
  }

  const incomingHash = hashPassword(password, salt).split(":")[1];
  return timingSafeEqual(Buffer.from(incomingHash, "hex"), Buffer.from(storedHash, "hex"));
}

function getFilteredPackages(searchParams) {
  let result = [...packages];
  const query = normalize(searchParams.q || searchParams.search);
  const packageType = normalize(searchParams.packageType);
  const flight = normalize(searchParams.flight);
  const theme = normalize(searchParams.theme);
  const category = normalize(searchParams.category);
  const sortBy = normalize(searchParams.sortBy);

  if (query) {
    result = result.filter((item) =>
      [item.title, item.place, item.category, item.theme].some((value) =>
        normalize(value).includes(query)
      )
    );
  }

  if (packageType) {
    result = result.filter((item) => normalize(item.packageType) === packageType);
  }

  if (flight) {
    result = result.filter((item) => normalize(item.flight) === flight);
  }

  if (theme) {
    result = result.filter((item) => normalize(item.theme) === theme);
  }

  if (category) {
    result = result.filter((item) => normalize(item.category) === category);
  }

  if (sortBy === "price-low-to-high") {
    result.sort((a, b) => a.priceValue - b.priceValue);
  }

  if (sortBy === "price-high-to-low") {
    result.sort((a, b) => b.priceValue - a.priceValue);
  }

  return result;
}

app.get("/", (_request, response) => {
  response.json({
    name: "Arrive Backend API",
    status: "running",
    database: "mongodb",
    endpoints: {
      health: "/api/health",
      packages: "/api/packages",
      signup: "/api/auth/signup",
      login: "/api/auth/login",
      bookings: "/api/bookings"
    }
  });
});

app.get("/api/health", (_request, response) => {
  response.json({
    status: "ok",
    service: "arrive-backend",
    database: "mongodb",
    timestamp: new Date().toISOString()
  });
});

app.get("/api/packages", (request, response) => {
  const data = getFilteredPackages(request.query);

  response.json({
    count: data.length,
    packages: data
  });
});

app.post("/api/auth/signup", async (request, response, next) => {
  try {
    const name = String(request.body?.name || "").trim();
    const email = normalize(request.body?.email);
    const password = String(request.body?.password || "");

    if (!name || !email || password.length < 6) {
      return response.status(400).json({
        error: "Name, valid email, and a 6+ character password are required."
      });
    }

    const database = getDatabase();
    const user = {
      name,
      email,
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString()
    };

    const result = await database.collection("users").insertOne(user);

    response.status(201).json({
      user: publicUser({ ...user, _id: result.insertedId }),
      token: result.insertedId.toString()
    });
  } catch (error) {
    if (error.code === 11000) {
      return response.status(409).json({
        error: "An account already exists for this email."
      });
    }

    next(error);
  }
});

app.post("/api/auth/login", async (request, response, next) => {
  try {
    const email = normalize(request.body?.email);
    const password = String(request.body?.password || "");

    if (!email || !password) {
      return response.status(400).json({
        error: "Email and password are required."
      });
    }

    const database = getDatabase();
    const user = await database.collection("users").findOne({ email });

    if (!user || !verifyPassword(password, user.passwordHash)) {
      return response.status(401).json({
        error: "Invalid email or password."
      });
    }

    response.json({
      user: publicUser(user),
      token: user._id.toString()
    });
  } catch (error) {
    next(error);
  }
});

app.post("/api/bookings", async (request, response, next) => {
  try {
    const packageId = String(request.body?.packageId || "").trim();
    const location = String(request.body?.location || "").trim();
    const date = String(request.body?.date || "").trim();
    const guests = String(request.body?.guests || request.body?.guest || "").trim();
    const name = String(request.body?.name || "").trim();
    const email = normalize(request.body?.email);
    const notes = String(request.body?.notes || "").trim();

    if (!location || !date || !guests || !name || !email) {
      return response.status(400).json({
        error: "Location, date, guests, name, and email are required."
      });
    }

    const selectedPackage = packageId ? packages.find((item) => item.id === packageId) : null;
    const booking = {
      packageId: selectedPackage?.id || packageId || null,
      packageTitle: selectedPackage?.title || null,
      location,
      date,
      guests,
      name,
      email,
      notes,
      status: "pending",
      createdAt: new Date().toISOString()
    };

    const database = getDatabase();
    const result = await database.collection("bookings").insertOne(booking);

    response.status(201).json({
      booking: publicBooking({ ...booking, _id: result.insertedId })
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/bookings", async (_request, response, next) => {
  try {
    const database = getDatabase();
    const bookings = await database
      .collection("bookings")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    response.json({
      count: bookings.length,
      bookings: bookings.map(publicBooking)
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/bookings/:id", async (request, response, next) => {
  try {
    if (!ObjectId.isValid(request.params.id)) {
      return response.status(400).json({ error: "Invalid booking id." });
    }

    const database = getDatabase();
    const booking = await database
      .collection("bookings")
      .findOne({ _id: new ObjectId(request.params.id) });

    if (!booking) {
      return response.status(404).json({ error: "Booking not found." });
    }

    response.json({ booking: publicBooking(booking) });
  } catch (error) {
    next(error);
  }
});

app.use((_request, response) => {
  response.status(404).json({ error: "Route not found." });
});

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ error: "Internal server error." });
});

export async function startServer() {
  await connectDatabase();

  app.listen(port, () => {
    console.log(`Arrive backend running at http://localhost:${port}`);
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  startServer().catch((error) => {
    console.error("Failed to start backend.");
    console.error(error);
    process.exit(1);
  });
}

export default app;
