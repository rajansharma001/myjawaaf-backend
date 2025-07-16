import express from "express";
import type { Response, Request } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { dbConnect } from "./dbConnect";
import { router } from "../routes/authRouter";
import { verifyToken } from "../middleware/verifyToken";
import { allowRole } from "../middleware/allowRole";
import { courseRoute } from "../routes/courseRoute";
import { lessonRoute } from "../routes/lessonRoute";
import { categoryRoute } from "../routes/categoryRoute";
import { enrollRoute } from "../routes/enrollRoute";
import { publicRoute } from "../routes/publicRoutes/publicRoutes";
import cors from "cors";
const app = express();
dotenv.config();
dbConnect();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use(
  cors({
    origin: "https://myjawaaf-frontend.vercel.app",
    // origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use("/api/auth", router);
app.use(
  "/api/auth/category",
  verifyToken,
  allowRole("admin", "teacher"),
  categoryRoute
);
app.use(
  "/api/auth/course",
  verifyToken,
  allowRole("admin", "teacher"),
  courseRoute
);
app.use(
  "/api/auth/lesson",
  verifyToken,
  allowRole("admin", "teacher"),
  lessonRoute
);
app.use(
  "/api/auth/enroll",
  verifyToken,
  allowRole("admin", "student", "enroll"),
  enrollRoute
);

app.get("/api/auth/session-user", (req: Request, res: Response) => {
  const token = req.cookies.token;

  console.log("is token coming: ", token);
  if (!token) return res.status(401).json({ msg: "No token found" });

  try {
    const secret = process.env.TOKEN_SECRET;
    if (!secret) {
      throw new Error("TOKEN_SECRET is not defined in environment variables");
    }
    const decoded = jwt.verify(token, secret);
    res.status(200).json({ user: decoded });
  } catch (err) {
    res.status(403).json({ msg: "Invalid or expired token" });
  }
});
// public api

app.use("/api", publicRoute);

// use verifytoken when you need to protect any route. Loggedin users can only get the content
// use allowroles when you need to restrict any uer or to apply role base aacess

app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT} `);
});
