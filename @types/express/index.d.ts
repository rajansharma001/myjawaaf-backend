import { User } from "../../model/userSchema"; // adjust path if needed

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
