"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1["default"])();
app.use((0, cors_1["default"])());
app.get("/", function (req, res) {
    return res.status(200).json({
        msg: "Root endpoint of: https://github.com/sanqro/IDPA_Hauptprojekt"
    });
});
var port = parseInt(process.env.PORT) || 8080;
app.listen(port, function () {
    console.log("listening on port ".concat(port));
});
module.exports = app;
