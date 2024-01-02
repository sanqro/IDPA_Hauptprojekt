import express from "express";
import * as dotenv from "dotenv";
import path from "path";
import { Deta } from "deta";
import { IScoreData } from "../interfaces/interfaces";
import checkUserScore from "../middlware/checkUserScore";
import checkUserScoreIDParams from "../middlware/checkUserScoreIDParams";
import checkUserSetUsernameParams from "../middlware/checkUserSetUsernameParams";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// deta setup
const projectKey: string = process.env.DETA_PROJECT_KEY;
const deta = Deta(projectKey);
const scores = deta.Base("scores");
const sets = deta.Base("sets");

const router = express.Router();

router.post("/create", checkUserScore, async (req, res) => {
  try {
    const scoreData: IScoreData = req.body as IScoreData;

    if (
      scoreData.username === "" ||
      scoreData.set === "" ||
      scoreData.score === null ||
      scoreData.username === undefined ||
      scoreData.set === undefined ||
      scoreData.score === undefined
    ) {
      throw new Error("Invalid Request");
    }

    if ((await sets.get(scoreData.set)) == null) {
      throw new Error("This set does not exist.");
    }
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

router.post("/update", checkUserScore, async (req, res) => {
  try {
    const scoreData: IScoreData = req.body as IScoreData;

    if (
      scoreData.username === "" ||
      scoreData.set === "" ||
      req.body.oldkey === "" ||
      scoreData.score === null ||
      scoreData.username === undefined ||
      scoreData.set === undefined ||
      req.body.oldkey === undefined
    ) {
      throw new Error("Invalid Request");
    }
    if (!(await scores.get(req.body.oldKey))) {
      throw new Error("This score does not exist.");
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

router.delete("/delete/:id", checkUserScoreIDParams, async (req, res) => {
  try {
    const fetchedScore = await scores.get(req.params.id as string);
    if (fetchedScore != null) {
      await scores.delete(req.params.id as string);
      res.status(200).json({ message: "Deleted score", id: req.params.id, sucess: true });
    } else {
      res.status(409).json({
        error: "This score does not exist."
      });
      return false;
    }
  } catch (err) {
    res.status(503).json({ error: err.message });
  }
});

router.get("/get/:username", checkUserSetUsernameParams, async (req, res) => {
  try {
    const fetchedScore = await scores.fetch({ username: req.params.username });
    if (fetchedScore === null) {
      throw new Error("No scores found");
    }
    res.status(201).json({ fetchedScore });
  } catch (err) {
    res.status(503).json({ error: err.message });
  }
});

router.get("/get/:id", checkUserScoreIDParams, async (req, res) => {
  try {
    const fetchedScore = await scores.get(req.params.id);
    if (fetchedScore == null) {
      res.status(409).json({
        error: "This score does not exist."
      });
      return false;
    } else {
      res.status(201).json({ fetchedScore });
    }
  } catch (err) {
    res.status(503).json({ error: err.message });
  }
});

export default router;
