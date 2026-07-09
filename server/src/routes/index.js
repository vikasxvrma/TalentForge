// this is entry point for requests with url 
// this is indexing for routes available 
import { Router } from "express";
import { healthController } from "../controllers/healthController.js";
// create instance 
const router =Router();
router.get("/health",healthController);

export default router