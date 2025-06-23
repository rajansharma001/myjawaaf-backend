import express from "express";
import type { Response, Request } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { dbConnect } from "./dbConnect.ts";
import { router } from "../routes/authRouter.ts";
import { verifyToken } from "../middleware/verifyToken.ts";
import { allowRole } from "../middleware/allowRole.ts";
import { courseRoute } from "../routes/courseRoute.ts";
import { lessonRoute } from "../routes/lessonRoute.ts";
import { categoryRoute } from "../routes/categoryRoute.ts";
const app = express();
dotenv.config();
dbConnect();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", router);
app.use("/api/auth/catgory", verifyToken, categoryRoute);
app.use("/api/auth/course", verifyToken, courseRoute);
app.use("/api/auth/lesson", verifyToken, lessonRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("welcome ");
});

// use verifytoken when you need to protect any route. Loggedin users can only get the content
// use allowroles when you need to restrict any uer or to apply role base aacess

// Only admin
router.get("/admin/dashboard", verifyToken, allowRole("admin"), (req, res) => {
  res.json({ msg: "Welcome Admin", user: req.user });
});
app.listen(4000, () => {
  console.log(`Server running at PORT: 4000 `);
});
