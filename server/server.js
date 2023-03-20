import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import favicon from "serve-favicon";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/api/users.js";
import auth from "./config/auth.js";

import { connectToDb } from "./config/database.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(auth);

// Proxy
app.use(favicon(join(__dirname, "..", "client", "build", "favicon.ico")));
app.use(express.static(join(__dirname, "..", "client", "build")));

// Put API routes here, before the "catch all" route
app.use("/api/users", userRoutes);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

const port = process.env.PORT || 3001;

async function startServer() {
  await connectToDb();

  app.listen(port, function () {
    console.log(`Express app running on port ${port}`);
  });
}

startServer();
