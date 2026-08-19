import { Request, Response } from "express";
import { fromPromise } from "neverthrow";
import { db } from "../db/db";
import { rateTable } from "../models/rate.model";
import { eq } from "drizzle-orm";
export const createRate = async (req: Request, res: Response) => {
  const { effective_from, rate_per_unit } = req.body;
  if (!effective_from || !rate_per_unit) {
    return res.status(400).json({
      success: false,
      message: "Some fields are missing",
    });
  }

  const data = await fromPromise(
    db.insert(rateTable).values({
      effective_from,
      rate_per_unit,
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
    message: "Rate inserted successfully",
  });
};

export const updateRate = async (req: Request, res: Response) => {
  const { effective_from, rate_per_unit } = req.body;
  const { id } = req.params;
  if (!effective_from || !rate_per_unit || !id) {
    return res.status(400).json({
      success: false,
      message: "Some fields are missing",
    });
  }
  const data = await fromPromise(
    db
      .update(rateTable)
      .set({
        rate_per_unit,
        effective_from,
      })
      .where(eq(rateTable.id, Number(id))),
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
    message: "Rate updated successfully",
  });
};

export const getAllRate = async (req: Request, res: Response) => {
  const data = await fromPromise(
    db.select().from(rateTable),
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
    data: data.value,
  });
};

export const deleteRate = async (req: Request, res: Response) => {
  const { id } = req.params;
  const rate = await fromPromise(
    db
      .select()
      .from(rateTable)
      .where(eq(rateTable.id, Number(id))),
    () => new Error("Database Error"),
  );
  if (rate.isErr()) {
    return res.status(500).json({
      message: rate.error.message,
      success: false,
    });
  }
  if (rate.value.length == 0) {
    return res.status(500).json({
      message: "Renter doesnt exists",
      success: false,
    });
  }
  const data = await fromPromise(
    db.delete(rateTable).where(eq(rateTable.id, Number(id))),
    () => new Error("Database Error"),
  );
  if (data.isErr()) {
    return res.status(500).json({
      success: true,
      message: data.error.message,
    });
  }
  return res.status(200).json({
    success: true,
    message: "Rate deleted successfully",
  });
};
