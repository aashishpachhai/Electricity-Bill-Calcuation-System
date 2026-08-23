import express, { Router } from "express";
import * as billsController from "../controller/bills.controller";
export const billsRouter: Router = express.Router();
billsRouter.post("/", billsController.createBill);
billsRouter.get("/:id", billsController.getPreviousReadingById);
