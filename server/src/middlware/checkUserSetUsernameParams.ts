import jwt from "jsonwebtoken";
import { IJWTPayload } from "../interfaces/interfaces";
import * as dotenv from "dotenv";
import path from "path";
import { Deta } from "deta";

export default async function checkUserSetUsernameParams(req: any, res: any, next: any) {
  try {
    dotenv.config({ path: path.resolve(__dirname, "../.env") });

    const token: string = req.headers.authorization;
    const jwtData = jwt.verify(token, process.env.JWT_SECRET);
    const key = req.params.username;

    const projectKey: string = process.env.PROJECT_KEY;
    const deta = Deta(projectKey);
    const users = deta.Base("users");

    const username: string = (jwtData as IJWTPayload).username;
    const userData = await users.get(key);

    if (userData == null) {
      res.status(401).json({
        message: "This user does not exist!",
        success: false
      });
      return false;
    }

    if (userData.username != username) {
      res.status(401).json({
        message: "You are not authorized to do this!",
        success: false
      });
      return false;
    }

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
