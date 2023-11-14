import express from "express";
import * as dotenv from "dotenv";
import path from "path";
import { Deta } from "deta";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// deta setup
const projectKey: string = process.env.DETA_PROJECT_KEY;
const deta = Deta(projectKey);
const auth = deta.Base("users");

const router = express.Router();

router.post("/register", async (req, res) => {});

router.post("/login", async (req, res) => {});

export default router;
