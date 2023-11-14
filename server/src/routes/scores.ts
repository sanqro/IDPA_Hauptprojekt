import express from "express";
import * as dotenv from "dotenv";
import path from "path";
import { Deta } from "deta";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// deta setup
const projectKey: string = process.env.DETA_PROJECT_KEY;
const deta = Deta(projectKey);
const scores = deta.Base("scores");

const router = express.Router();

router.post("/create", async (req, res) => {
});

router.post("/update/:id", async (req, res) => {
});

router.delete("/delete/:id", async (req, res) => {
});

router.get("/getAll", async (req, res) => {
});

router.get("/get/:id", async (req, res) => {
});



export default router;
