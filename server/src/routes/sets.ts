import express from "express";
import * as dotenv from "dotenv";
import path from "path";
import { Deta } from "deta";
import { ISetData } from "../interfaces/interfaces";
import checkUserSet from "../middlware/checkUserSet";
import checkUserSetIDParams from "../middlware/checkUserSetIDParams";
import checkUserSetUsernameParams from "../middlware/checkUserSetUsernameParams";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// deta setup
const projectKey: string = process.env.DETA_PROJECT_KEY;
const deta = Deta(projectKey);
const sets = deta.Base("sets");

const router = express.Router();

router.post("/create", checkUserSet, async (req, res) => {
  try {
    const setData: ISetData = req.body as ISetData;

    if (
      setData.creator === "" ||
      setData.title === "" ||
      setData.type === "" ||
      setData.question === null ||
      setData.answer === null ||
      setData.public === null ||
      setData.creator === undefined ||
      setData.title === undefined ||
      setData.question === undefined ||
      setData.answer === undefined ||
      setData.public === undefined ||
      setData.type === undefined ||
      (setData.type !== "accounting" && setData.type !== "questions")
    ) {
      throw new Error("Invalid Request");
    }

    if (await sets.get(setData.title + setData.creator)) {
      throw new Error("This set exists already. Please use a different title.");
    }

    const setDataJson = {
      key: setData.title + setData.creator,
      title: setData.title,
      creator: setData.creator,
      question: setData.question,
      answer: setData.answer,
      public: setData.public,
      type: setData.type
    };

    await sets.insert(setDataJson);

    res.status(201).json({
      title: setData.title,
      creator: setData.creator,
      question: setData.question,
      answer: setData.answer,
      public: setData.public,
      type: setData.type,
      success: true
    });
  } catch (err) {
    res.status(503).json({ error: err.message });
  }
});

router.post("/update", checkUserSet, async (req, res) => {
  try {
    const setData: ISetData = req.body as ISetData;

    if (
      setData.creator === "" ||
      setData.title === "" ||
      setData.question === null ||
      setData.answer === null ||
      setData.public === null ||
      req.body.oldKey === "" ||
      setData.creator === undefined ||
      setData.title === undefined ||
      setData.question === undefined ||
      setData.answer === undefined ||
      setData.public === undefined ||
      req.body.oldKey === undefined
    ) {
      throw new Error("Invalid Request");
    }

    if (!(await sets.get(req.body.oldKey))) {
      throw new Error("This set does not exist.");
    }

    const setDataJson = {
      key: setData.title + setData.creator,
      title: setData.title,
      creator: setData.creator,
      answer: setData.answer,
      question: setData.question,
      public: setData.public
    };
    await sets.delete(req.body.oldKey);
    await sets.insert(setDataJson);

    res.status(201).json({
      title: setDataJson.title,
      creator: setDataJson.creator,
      question: setDataJson.question,
      answer: setDataJson.answer,
      public: setDataJson.public,
      success: true
    });
  } catch (err) {
    res.status(503).json({ error: err.message });
  }
});

router.delete("/delete/:id", checkUserSetIDParams, async (req, res) => {
  try {
    const fetchedSet = await sets.get(req.params.id as string);
    if (fetchedSet != null) {
      await sets.delete(req.params.id as string);
      res.status(200).json({ message: "Deleted set", id: req.params.id, sucess: true });
    } else {
      res.status(409).json({
        error: "This set does not exist."
      });
      return false;
    }
  } catch (err) {
    res.status(503).json({ error: err.message });
  }
});

router.get("/getAll/:username", checkUserSetUsernameParams, async (req, res) => {
  try {
    const username = req.params.username;
    if (username == undefined || username == null || username == "") {
      throw new Error("Invalid username.");
    }
    const fetchedSets = await sets.fetch({ creator: username });
    const fetchedPublicSets: any = await sets.fetch({ public: true });

    console.log(fetchedPublicSets);
    for (let i = 0; i < fetchedPublicSets.count; i++) {
      if (!fetchedSets.items.some((item) => item.key === fetchedPublicSets.items[i].key)) {
        fetchedSets.items.push(fetchedPublicSets.items[i]);
        fetchedSets.count++;
      }
    }
    if (fetchedSets == null || fetchedPublicSets == null) {
      res.status(409).json({
        error: "No sets yet."
      });
      return false;
    } else {
      res.status(201).json({ fetchedSets });
    }
  } catch (err) {
    res.status(503).json({ error: err.message });
  }
});

router.get("/get/:id", checkUserSetIDParams, async (req, res) => {
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

export default router;
