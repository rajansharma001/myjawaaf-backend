import type { Request, Response, NextFunction } from "express";
export const allowRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        msg: "Access denind! you are not allowed to access this page",
      });
    }
    next();
  };
};
