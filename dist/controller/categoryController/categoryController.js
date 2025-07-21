"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryByIdCotroller = exports.getCategoryCotroller = exports.deleteCategoryCotroller = exports.upadteCategoryCotroller = exports.createCategoryCotroller = void 0;
const categorySchema_1 = require("../../model/categorySchema");
const createCategoryCotroller = async (req, res) => {
    try {
        const { title, slug, description } = req.body;
        if (!title || !slug) {
            return res
                .status(404)
                .json({ msg: "Please fillup all required fields." });
        }
        const newCategory = { title, slug, description };
        const createCategory = await categorySchema_1.CourseCategory.create(newCategory);
        if (!createCategory) {
            return res.status(403).json({ msg: "Category creation failed." });
        }
        return res.status(200).json({ msg: "Category Created." });
    }
    catch (error) {
        return res
            .status(500)
            .json({ msg: "Bad Request for category creation.", error });
    }
};
exports.createCategoryCotroller = createCategoryCotroller;
const upadteCategoryCotroller = async (req, res) => {
    try {
        const { title, slug, description } = req.body;
        const _id = req.params.id;
        const updateCategoryDetails = { title, slug, description };
        const updateCategory = await categorySchema_1.CourseCategory.updateOne({ _id }, { $set: updateCategoryDetails });
        if (!updateCategory) {
            return res.status(403).json({ msg: "Category update failed." });
        }
        return res.status(200).json({ msg: "Category Updated." });
    }
    catch (error) {
        return res
            .status(500)
            .json({ msg: "Bad Request for category update.", error });
    }
};
exports.upadteCategoryCotroller = upadteCategoryCotroller;
const deleteCategoryCotroller = async (req, res) => {
    try {
        const _id = req.params.id;
        const deleteCategory = await categorySchema_1.CourseCategory.deleteOne({ _id });
        if (!deleteCategory) {
            return res.status(403).json({ msg: "Category delete failed." });
        }
        return res.status(200).json({ msg: "Category Deleted." });
    }
    catch (error) {
        return res
            .status(500)
            .json({ msg: "Bad Request for category delete.", error });
    }
};
exports.deleteCategoryCotroller = deleteCategoryCotroller;
const getCategoryCotroller = async (req, res) => {
    try {
        const fetchCategory = await categorySchema_1.CourseCategory.find();
        if (!fetchCategory) {
            return res.status(403).json({ msg: "Category fetch failed." });
        }
        return res.status(200).json({ fetchCategory });
    }
    catch (error) {
        return res
            .status(500)
            .json({ msg: "Bad Request for category fetch.", error });
    }
};
exports.getCategoryCotroller = getCategoryCotroller;
const getCategoryByIdCotroller = async (req, res) => {
    try {
        const _id = req.params.id;
        console.log("category id getting: ", _id);
        const fetchCat = await categorySchema_1.CourseCategory.findOne({ _id });
        console.log("category by id: ", fetchCat);
        if (!fetchCat) {
            return res.status(403).json({ msg: "Category fetch failed." });
        }
        return res.status(200).json({ fetchCat });
    }
    catch (error) {
        return res
            .status(500)
            .json({ msg: "Bad Request for category fetch.", error });
    }
};
exports.getCategoryByIdCotroller = getCategoryByIdCotroller;
