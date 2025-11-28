import express from "express";
import upload from "../middleware/multer.js";
import { addProduct, listProduct, removeProduct, singleProduct, updateProduct } from "../controllers/productController.js";

const router = express.Router();

router.post("/add", upload.array("images", 4), addProduct);
router.get("/list", listProduct);
router.post("/remove", removeProduct);
router.post("/single", singleProduct);

//New route for updating a product
router.put("/update", upload.array("images", 4), updateProduct);

export default router;
