"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowRole = void 0;
const allowRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                msg: "Access denind! you are not allowed to access this page",
            });
        }
        next();
    };
};
exports.allowRole = allowRole;
