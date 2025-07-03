import express from "express";
import type { Response, Request } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { dbConnect } from "./dbConnect.ts";
import { router } from "../routes/authRouter.ts";
import { verifyToken } from "../middleware/verifyToken.ts";
import { allowRole } from "../middleware/allowRole.ts";
import { courseRoute } from "../routes/courseRoute.ts";
import { lessonRoute } from "../routes/lessonRoute.ts";
import { categoryRoute } from "../routes/categoryRoute.ts";
import { enrollRoute } from "../routes/enrollRoute.ts";
import { publicRoute } from "../routes/publicRoutes/publicRoutes.ts";
import cors from "cors";
const app = express();
dotenv.config();
dbConnect();

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use(
  cors({
    origin: "http://localhost:3000",
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
  allowRole("admin", "teacher", "enroll"),
  enrollRoute
);

app.get("/api/auth/session-user", (req: Request, res: Response) => {
  const token = req.cookies.token;

  console.log("is token coming: ", token);
  if (!token) return res.status(401).json({ msg: "No token found" });

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    res.status(200).json({ user: decoded });
  } catch (err) {
    res.status(403).json({ msg: "Invalid or expired token" });
  }
});
// public api

app.use("/api", publicRoute);

// use verifytoken when you need to protect any route. Loggedin users can only get the content
// use allowroles when you need to restrict any uer or to apply role base aacess

app.listen(4000, () => {
  console.log(`Server running at PORT: 4000 `);
});
