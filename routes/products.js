const express = require("express");
const router = express.Router();
const controller = require("../controllers/productsController");

router.post("/", controller.createProduct);
router.get("/", controller.listProducts);
router.get("/:id", controller.getProduct);
router.put("/:id", controller.updateProduct);

module.exports = router;
