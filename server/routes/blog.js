import express from "express";
import AuthController from "../controllers/authcontroller.js";
import BlogController from "../controllers/blogcontroller.js";
import CategoryController from "../controllers/catagorycontroller.js";

const router = express.Router();

// User Authentication Routes
router.post("/user/register", AuthController.userRegistration);
router.post("/user/login", AuthController.userLogin);

// Blog Routes
router.get("/get/allblogs",BlogController.getAllBlogs);
router.post("/add/blog", upload.single("thumbnail"),BlogController.addNewBlog);
router.get("/get/blog/:id",BlogController.getSingleBlog);

// Category Routes
router.get("/get/catagories",CategoryController.getAllCategories);
router.post("/add/catagory",CategoryController.addNewCategory);
export default router;
