import * as controllers from "../controllers";
import express from "express";
import { verifyToken } from "../middlewares/verify_token";
import { isAdmin, isdModeratorOrAdmin } from "../middlewares/verify_roles";
const router = express.Router();

//PUBLIC ROUTES

//PRIVAE ROUTES
router.use(verifyToken);
// router.use(isAdmin);
// router.use(isdModeratorOrAdmin);
router.get("/", controllers.getCurrent);

module.exports = router;
