import express from "express";
import cors from "cors";
import auth from "./routes/auth";
import sets from "./routes/sets";
import scores from "./routes/scores";
import authState from "./middlware/authState";

const app = express();
app.use(express.json());
app.use(cors());
app.disable("etag");

app.use("/auth", auth);
app.use("/sets", authState, sets);
app.use("/scores", authState, scores);

app.get("/", (req, res) =>
  res.status(200).json({
    msg: "This is the API for following application on GitHub: https://github.com/sanqro/IDPA_Hauptprojekt"
  })
);

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on port ${port}`);
});

module.exports = app;
