import cors from "cors";
import path from "path";
import {
  saveDocument,
  getDocument,
  getDocuments,
  deleteDocument,
} from "./service/document.js";
import multer from "multer";
import express from "express";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3001;
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
const app = express();
const prisma = new PrismaClient();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).send({ error: "Invalid JSON payload." });
  }
  next();
});

/**
 * Setting up storage for uploaded documents
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "files/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
}).single("file");

/**
 * Allow users to acces files under folder files
 */
app.use("/files", express.static(path.join(__dirname, "files")));

/**
 * Document routes
 */
app.get("/api/document", async (req, res) => {
  getDocuments(prisma, res);
});

app.get("/api/document/:id", async (req, res) => {
  getDocument(prisma, req, res);
});

app.post("/api/document", async (req, res) => {
  upload(req, res, (err) => {
    if (!req.file) {
      return res.status(500).json({ error: "Missing required fields!" });
    }
    if (err) {
      return res
        .status(500)
        .json({ message: "File upload failed", error: err.message });
    }

    saveDocument(prisma, req, res);
  });
});

app.delete("/api/document/:id", async (req, res) => {
  deleteDocument(prisma, req, res);
});

/**
 * Starting server
 */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
