import express from "express";
import * as dotenv from "dotenv";
import path from "path";
import { Deta } from "deta";
import { ISetData } from "../interfaces/interfaces";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// deta setup
const projectKey: string = process.env.DETA_PROJECT_KEY;
const deta = Deta(projectKey);
const sets = deta.Base("sets");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const setData: ISetData = req.body as ISetData;

    if (await sets.get(setData.title + setData.creator)) {
      throw new Error("This set exists already. Please use a different title.");
    }

    const setDataJson = {
      key: setData.title + setData.creator,
      title: setData.title,
      creator: setData.creator,
      question: setData.question,
      answer: setData.answer
    };

    await sets.insert(setDataJson);

    res.status(201).json({
      title: setData.title,
      creator: setData.creator,
      question: setData.question,
      answer: setData.answer,
      success: true
    });
  } catch (err) {
    res.status(503).json({ error: err.message });
  }
});

router.post("/update", async (req, res) => {
  try {
    const setData: ISetData = req.body as ISetData;

    if (!(await sets.get(req.body.oldKey))) {
      throw new Error("This set does not exist.");
    }

    const setDataJson = {
      key: setData.title + setData.creator,
      title: setData.title,
      creator: setData.creator,
      answer: setData.answer,
      question: setData.question
    };
    await sets.delete(req.body.oldKey);
    await sets.insert(setDataJson);

    res.status(201).json({
      title: setDataJson.title,
      creator: setDataJson.creator,
      question: setDataJson.question,
      answer: setDataJson.answer,
      success: true
    });
  } catch (err) {
    res.status(503).json({ error: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {});

router.get("/getAll", async (req, res) => {
  try {
    const fetchedSets = await sets.fetch();
    if (fetchedSets === null) {
      throw new Error("No sets found");
    }
    res.status(201).json({ fetchedSets });
  } catch (err) {
    res.status(503).json({ error: err.message });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    const fetchedSet = await sets.get(req.params.id);
    if (fetchedSet == null) {
      res.status(409).json({
        error: "This set does not exist."
      });
      return false;
    } else {
      res.status(201).json({ fetchedSet });
    }
  } catch (err) {
    res.status(503).json({ error: err.message });
  }
});

router.get("/get/:number", async (req, res) => {});

export default router;
