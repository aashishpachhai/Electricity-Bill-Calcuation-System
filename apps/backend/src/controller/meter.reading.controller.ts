import { Request, Response } from "express";
import { fromPromise } from "neverthrow";
import { db } from "../db/db";
import { meterReadingTable } from "../models/meter.reading.moedl";
export const createMeterReading = async (req: Request, res: Response) => {
  const { renter_id, meter_reading } = req.body;
  if (!renter_id || !meter_reading) {
    return res.status(400).json({
      success: false,
      message: "Some fields are required",
    });
  }
  const data = await fromPromise(
    db.insert(meterReadingTable).values({
      meter_reading,
      renter_id,
      created_at: new Date(),
    }),
    () => new Error("Database Error"),
  );
  if (data.isErr()) {
    return res.status(500).json({
      success: false,
      message: data.error.message,
    });
  }
  return res.status(200).json({
    success: true,
    message: "Meter reading added successfully",
  });
};
