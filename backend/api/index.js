import app from "../src/server.js";
import { connectDatabase } from "../src/db.js";

await connectDatabase();

export default app;
