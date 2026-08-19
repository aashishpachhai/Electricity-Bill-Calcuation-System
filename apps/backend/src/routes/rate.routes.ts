import express from "express";
import * as rateController from "../controller/rate.controller";
export const rateRouter = express.Router();
rateRouter.post("/", rateController.createRate);
rateRouter.put("/:id", rateController.updateRate);
rateRouter.get("/", rateController.getAllRate);
rateRouter.delete("/:id", rateController.deleteRate);
