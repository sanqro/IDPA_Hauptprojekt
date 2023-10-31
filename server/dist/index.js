"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.disable("etag");
app.get("/", (req, res) => res.status(200).json({
    msg: "This is the API of the following repository on GitHub: https://github.com/sanqro/IDPA_Hauptprojekt"
}));
const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
module.exports = app;
