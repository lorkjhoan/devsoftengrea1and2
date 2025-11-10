const express = require("express");
const router = express.Router();
const controller = require("../controllers/clientsController");

router.post("/", controller.createClient);
router.get("/", controller.listClients);
router.get("/:id", controller.getClient);
router.put("/:id", controller.updateClient);

module.exports = router;
