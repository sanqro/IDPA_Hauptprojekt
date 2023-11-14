import express from "express";
import * as dotenv from "dotenv";
import path from "path";
import { Deta } from "deta";
import { IAuthFormData } from "../interfaces/interfaces";
import argon2 from "argon2";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// deta setup
const projectKey: string = process.env.DETA_PROJECT_KEY;
const deta = Deta(projectKey);
const users = deta.Base("users");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const authFormData: IAuthFormData = req.body as IAuthFormData;
    
        if (!(await users.get(authFormData.username))) {
          const passwordHash = await argon2.hash(authFormData.password);
          const auhtFormDataJson = {
            key: authFormData.username,
            password: passwordHash
          };

          const userToCreate = await users.insert(auhtFormDataJson);
    
          res.status(201).json({
            username: userToCreate.key,
            success: true
          });
        } else {
          throw new Error("This username is already taken");
        }
      } catch (err) {
        res.status(503).json({ error: err.message });
      }
});

router.post("/login", async (req, res) => {});

export default router;
