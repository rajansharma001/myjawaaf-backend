import express from "express";
import { createCategoryCotroller } from "../controller/categoryController/createCategoryController.ts";

export const categoryRoute = express.Router();

categoryRoute.post("/create-category", createCategoryCotroller);
