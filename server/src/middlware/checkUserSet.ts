import jwt from "jsonwebtoken";
import { IJWTPayload } from "../interfaces/interfaces";
import * as dotenv from "dotenv";
import path from "path";
import { Deta } from "deta";

export default async function checkUserSet(req: any, res: any, next: any) {
  try {
    dotenv.config({ path: path.resolve(__dirname, "../.env") });

    const token: string = req.headers.authorization;
    const jwtData = jwt.verify(token, process.env.JWT_SECRET);
    const id = req.body.oldKey ?? req.body.key;

    const projectKey: string = process.env.PROJECT_KEY;
    const deta = Deta(projectKey);
    const scores = deta.Base("scores");

    const username: string = (jwtData as IJWTPayload).username;
    const scoresData = await scores.get(id);

    if (scores == null) {
      res.status(401).json({
        message: "This score does not exist!",
        success: false
      });
      return false;
    }

    if (scoresData.username != username) {
      res.status(401).json({
        message: "This score does not belong to you!",
        success: false
      });
      return false;
    }

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
