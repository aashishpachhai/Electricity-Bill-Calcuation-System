import express from "express";
import * as renterController from "../controller/renter.controller";
export const renterRouter = express.Router();
renterRouter.post("/", renterController.createRenter);
renterRouter.put("/:id", renterController.editRenter);
