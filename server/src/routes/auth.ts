import express from "express";
import * as dotenv from "dotenv";
import path from "path";
import { Deta } from "deta";
import { IAuthFormData } from "../interfaces/interfaces";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// deta setup
const projectKey: string = process.env.DETA_PROJECT_KEY;
const deta = Deta(projectKey);
const users = deta.Base("users");

// jwt setup
const jwtSecret: string = process.env.JWT_SECRET;

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const authFormData: IAuthFormData = req.body as IAuthFormData;

        if (authFormData.username === "" || authFormData.password === "" || authFormData.username === undefined || authFormData.password === undefined) {
            throw new Error("Invalid Request");
          }

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

router.post("/login", async (req, res) => {
    try {
        const authFormData: IAuthFormData = req.body as IAuthFormData;
    
        if (authFormData.username === "" || authFormData.password === "" || authFormData.username === undefined || authFormData.password === undefined) {
            throw new Error("Invalid Request");
          }
          
        const user = await users.get(authFormData.username);
    
        if (user === null) {
            res.status(401).json({
                error: "Wrong credentials! Please try again.",
                success: false
              });
              return 0;
        }
    
        const password = user.password as string;
    
        if (await argon2.verify(password, authFormData.password)) {
          const token = jwt.sign({ username: user.key }, jwtSecret, { expiresIn: "21600s" });
          res.status(200).json({ token, success: true });
        } else {
          res.status(401).json({
            error: "Wrong credentials! Please try again.",
            success: false
          });
        }
      } catch (err) {
        res.status(503).json({ error: err.message });
      }
});

export default router;
