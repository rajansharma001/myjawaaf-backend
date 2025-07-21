"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoute = void 0;
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controller/categoryController/categoryController");
exports.categoryRoute = express_1.default.Router();
exports.categoryRoute.post("/create-category", categoryController_1.createCategoryCotroller);
exports.categoryRoute.patch("/update-category/:id", categoryController_1.upadteCategoryCotroller);
exports.categoryRoute.delete("/delete-category/:id", categoryController_1.deleteCategoryCotroller);
exports.categoryRoute.get("/get-category", categoryController_1.getCategoryCotroller);
exports.categoryRoute.get("/get-category/:id", categoryController_1.getCategoryByIdCotroller);
