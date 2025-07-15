"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserController = exports.profileImgUpdateController = exports.profileUpdateController = void 0;
const userSchema_ts_1 = require("../../model/userSchema.ts");
const path_1 = __importDefault(require("path"));
const profileUpdateController = async (req, res) => {
    try {
        console.log("data coming: ", req.body);
        const currentUser = req.user;
        const { fullname, phone, bio, country } = req.body;
        const email = currentUser.email;
        const existingUser = await userSchema_ts_1.User.findOne({ email });
        if (!existingUser) {
            return res.status(403).json({ msg: "User is not found!" });
        }
        const newUserDetails = {
            fullname,
            phone,
            bio,
            country,
        };
        await userSchema_ts_1.User.updateOne({ email }, newUserDetails);
        return res.status(200).json({ msg: "Profile Updated!" });
    }
    catch (error) {
        console.error("Profile update error:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};
exports.profileUpdateController = profileUpdateController;
const profileImgUpdateController = async (req, res) => {
    try {
        const currentUser = req.user;
        const email = currentUser.email;
        const existingUser = await userSchema_ts_1.User.findOne({ email });
        if (!existingUser) {
            return res.status(403).json({ msg: "User is not found!" });
        }
        const file = req.file;
        const profileImg = file ? path_1.default.posix.join("uploads", file.filename) : "";
        console.log(file);
        console.log(profileImg);
        await userSchema_ts_1.User.updateOne({ email: email }, { $set: { profileImg } });
        return res.status(200).json({ msg: "Profile img Updated!" });
    }
    catch (error) {
        console.error("Profile img update error:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};
exports.profileImgUpdateController = profileImgUpdateController;
const getUserController = async (req, res) => {
    try {
        const getUser = await userSchema_ts_1.User.find();
        if (!getUser)
            return res.status(404).json({ msg: "User not found" });
        return res.status(200).json({ getUser });
    }
    catch (error) {
        console.log("something went wrong :", error);
        return res.status(500).json("Bad request for get user");
    }
};
exports.getUserController = getUserController;
