import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.disable("etag");

app.get("/", (req, res) =>
  res.status(200).json({
    msg: "This is the API of the following repository on GitHub: https://github.com/sanqro/IDPA_Hauptprojekt"
  })
);

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;
