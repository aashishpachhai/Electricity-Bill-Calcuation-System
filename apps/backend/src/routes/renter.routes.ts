import express from "express";
import * as renterController from "../controller/renter.controller";
export const renterRouter = express.Router();
renterRouter.post("/", renterController.createRenter);
renterRouter.put("/:id", renterController.editRenter);
renterRouter.delete("/:id", renterController.deleteRenter);
renterRouter.get("/", renterController.getAllRenter);
renterRouter.get("/mail", renterController.sendMail);
