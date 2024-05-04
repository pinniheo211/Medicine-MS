import * as controllers from "../controllers";
import express from "express";
import { verifyToken } from "../middlewares/verify_token";
import uploadCloud from "../middlewares/uploader";

const router = express.Router();

//PUBLIC ROUTES

//PRIVAE ROUTES
router.use(verifyToken);
router.get("/", controllers.getWarehouse);
router.post("/", controllers.createWarehouse);
router.put("/", controllers.updateWarehouse);
router.put("/", controllers.deleteWarehouse);

module.exports = router;
