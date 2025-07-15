"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseInputValidation = void 0;
const courseInputValidation = (req, res, next) => {
    console.log("checking body: ", req.body);
    try {
        const { title, slug, description, thumbnail, categoryId, isFree, price, discount, level, language, isPublished, tags, createdBy, } = req.body;
        console.log("checking body: ", req.body);
        if (!title || !slug || !description) {
            return res.status(403).json({ msg: "Please fill all required fields." });
        }
        next();
    }
    catch (error) {
        console.log("something went wrong while validating course input", error);
        return res.status(500).json({ msg: "Bad Request on course creation." });
    }
};
exports.courseInputValidation = courseInputValidation;
