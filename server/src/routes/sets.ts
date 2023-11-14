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
    
        const newSet = await sets.insert(setDataJson);
    
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

router.post("/update/:id", async (req, res) => {
});

router.delete("/delete/:id", async (req, res) => {
});

router.get("/getAll", async (req, res) => {
});

router.get("/get/:id", async (req, res) => {
});


router.get("/get/:number", async (req, res) => {
});


export default router;
