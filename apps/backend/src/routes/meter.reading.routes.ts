import express, { Router } from "express";
import * as meterReadingController from "../controller/meter.reading.controller";
export const meterReadingRouter: Router = express.Router();
meterReadingRouter.post("/", meterReadingController.createMeterReading);
