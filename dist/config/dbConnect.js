"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnect = async () => {
    try {
        const Connect = await mongoose_1.default.connect(process.env.MONGO_URI);
        if (!Connect) {
            console.log("DB connection failed");
        }
        return console.log("DB_CONNECTED!");
    }
    catch (error) {
        console.log("something went wrong on DB connection!");
    }
};
exports.dbConnect = dbConnect;
