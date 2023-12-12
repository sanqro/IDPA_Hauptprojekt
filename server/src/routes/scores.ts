import express from "express";
import * as dotenv from "dotenv";
import path from "path";
import { Deta } from "deta";
import { IScoreData } from "../interfaces/interfaces";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// deta setup
const projectKey: string = process.env.DETA_PROJECT_KEY;
const deta = Deta(projectKey);
const scores = deta.Base("scores");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const scoreData: IScoreData = req.body as IScoreData;

    if (await scores.get(scoreData.username + scoreData.set)) {
      throw new Error("This score exists already. Please use a different name.");
    }

    const scoreDataJson = {
      key: scoreData.username + scoreData.set,
      username: scoreData.username,
      set: scoreData.set,
      score: scoreData.score
    };

    await scores.insert(scoreDataJson);

    res.status(201).json({
      username: scoreData.username,
      set: scoreData.set,
      score: scoreData.score,
      success: true
    });
  } catch (err) {
    res.status(503).json({ error: err.message });
  }
});

router.post("/update", async (req, res) => {
  try {
    const scoreData: IScoreData = req.body as IScoreData;

    if (!(await scores.get(req.body.oldKey))) {
      throw new Error("This set does not exist.");
    }

    const scoreDataJson = {
      key: scoreData.username + scoreData.set,
      username: scoreData.username,
      set: scoreData.set,
      score: scoreData.score
    };

    await scores.delete(req.body.oldKey);
    await scores.insert(scoreDataJson);

    res.status(201).json({
      username: scoreData.username,
      set: scoreData.set,
      score: scoreData.score,
      success: true
    });
  } catch (err) {
    res.status(503).json({ error: err.message });
  }
});

export default router;
