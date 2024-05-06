import productController from "../controller/productController.mjs";
import { Router } from "express";

const router = Router();

router.post("/addProduct", async (req, res) => {
  productController.addProduct();
});

router.get("/allProducts", async (req, res) => {
  productController.getAllProducts();
});

router.get("/published", async (req, res) => {
  productController.getPublishedProduct();
});

router.get("/:id", async (req, res) => {
  productController.getOneProduct();
});

router.put("/:id", async (req, res) => {
  productController.UpdateOneProduct();
});

router.delete("/:id", async (req, res) => {
  productController.deletOneProduct();
});

export default router;
