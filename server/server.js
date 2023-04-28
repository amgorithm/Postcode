import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import favicon from "serve-favicon";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/api/users.js";
import postRoutes from "./routes/api/posts.js";
import auth from "./config/auth.js";

import { connectToDb } from "./config/database.js";
import errorHandling from "./middleware/errorHandling.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();

const app = express();

app.use(logger("dev"));
app.use(express.json());

app.use(
  cors({
    origin: [
      "https://postcode-app.netlify.app",
      "https://postcode-server.onrender.com",
      "http://localhost:3000",
    ],
  })
);

app.use(auth);

// Proxy
app.use(express.static(join(__dirname, "..", "client", "build")));

// Put API routes here, before the "catch all" route
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

app.use(errorHandling);
const port = process.env.PORT || 3001;

async function startServer() {
  await connectToDb();

  app.listen(port, function () {
    console.log(`Express app running on port ${port}`);
  });
}

startServer();
