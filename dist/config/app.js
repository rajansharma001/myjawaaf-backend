"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dbConnect_1 = require("./dbConnect");
const authRouter_1 = require("../routes/authRouter");
const verifyToken_1 = require("../middleware/verifyToken");
const allowRole_1 = require("../middleware/allowRole");
const courseRoute_1 = require("../routes/courseRoute");
const lessonRoute_1 = require("../routes/lessonRoute");
const categoryRoute_1 = require("../routes/categoryRoute");
const enrollRoute_1 = require("../routes/enrollRoute");
const publicRoutes_1 = require("../routes/publicRoutes/publicRoutes");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
dotenv_1.default.config();
(0, dbConnect_1.dbConnect)();
const PORT = process.env.PORT || 4000;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true })); // for urlencoded form data
app.use("/uploads", express_1.default.static("uploads"));
app.use((0, cors_1.default)({
    origin: "https://myjawaaf-frontend.vercel.app",
    // origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
}));
app.use("/api/auth", authRouter_1.router);
app.use("/api/auth/category", verifyToken_1.verifyToken, (0, allowRole_1.allowRole)("admin", "teacher"), categoryRoute_1.categoryRoute);
app.use("/api/auth/course", verifyToken_1.verifyToken, (0, allowRole_1.allowRole)("admin", "teacher"), courseRoute_1.courseRoute);
app.use("/api/auth/lesson", verifyToken_1.verifyToken, (0, allowRole_1.allowRole)("admin", "teacher"), lessonRoute_1.lessonRoute);
app.use("/api/auth/enroll", verifyToken_1.verifyToken, (0, allowRole_1.allowRole)("admin", "student", "enroll"), enrollRoute_1.enrollRoute);
app.get("/api/auth/session-user", (req, res) => {
    const token = req.cookies.token;
    console.log("is token coming: ", token);
    if (!token)
        return res.status(401).json({ msg: "No token found" });
    try {
        const secret = process.env.TOKEN_SECRET;
        if (!secret) {
            throw new Error("TOKEN_SECRET is not defined in environment variables");
        }
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        res.status(200).json({ user: decoded });
    }
    catch (err) {
        res.status(403).json({ msg: "Invalid or expired token" });
    }
});
// public api
app.use("/api", publicRoutes_1.publicRoute);
// use verifytoken when you need to protect any route. Loggedin users can only get the content
// use allowroles when you need to restrict any uer or to apply role base aacess
app.listen(PORT, () => {
    console.log(`Server running at PORT: ${PORT} `);
});
