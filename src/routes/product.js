import * as controllers from "../controllers";
import express from "express";
import { verifyToken } from "../middlewares/verify_token";
import uploadCloud from "../middlewares/uploader";

const router = express.Router();

//PUBLIC ROUTES
router.get("/", controllers.getProduct);

//PRIVAE ROUTES
router.use(verifyToken);
router.post("/", uploadCloud.single("image"), controllers.createProduct);

module.exports = router;
