import jwt from "jsonwebtoken";
import { IJWTPayload } from "../interfaces/interfaces";
import * as dotenv from "dotenv";
import path from "path";
import { Deta } from "deta";

export default async function checkUserSetIDParams(req: any, res: any, next: any) {
  try {
    dotenv.config({ path: path.resolve(__dirname, "../.env") });

    const token: string = req.headers.authorization;
    const jwtData = jwt.verify(token, process.env.JWT_SECRET);
    const id = req.params.id;

    const projectKey: string = process.env.PROJECT_KEY;
    const deta = Deta(projectKey);
    const sets = deta.Base("sets");

    const username: string = (jwtData as IJWTPayload).username;
    const setsData = await sets.get(id);

    if (setsData == null) {
      res.status(401).json({
        message: "This set does not exist!",
        success: false
      });
      return false;
    }

    if (setsData.creator != username) {
      res.status(401).json({
        message: "This set does not belong to you!",
        success: false
      });
      return false;
    }

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
