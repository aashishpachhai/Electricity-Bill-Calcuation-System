import { Request, Response } from "express";
import { fromPromise } from "neverthrow";
import { db } from "../db/db";
import { rateTable } from "../models/rate.model";
import { billsTable } from "../models/bills.models";
import { desc, eq } from "drizzle-orm";

export const createBill = async (req: Request, res: Response) => {
  const { renter_id, billing_month, previous_reading, current_reading } =
    req.body;
  if (!renter_id || !billing_month || !previous_reading || !current_reading) {
    return res.status(400).json({
      success: false,
      message: "Some fields are missing",
    });
  }
  const rate_per_unit = await fromPromise(
    db
      .select({ unit: rateTable.rate_per_unit })
      .from(rateTable)
      .orderBy(rateTable.effective_from)
      .then((res) => res[0]),
    () => new Error("Database Error"),
  );
  if (rate_per_unit.isErr()) {
    return res.status(500).json({
      success: false,
      message: rate_per_unit.error.message,
    });
  }
  const units_used = Number(current_reading) - Number(previous_reading);
  const electricity_bill = units_used * rate_per_unit.value.unit;

  const data = await fromPromise(
    db.insert(billsTable).values({
      renter_id: Number(renter_id),
      billing_month,
      previous_reading: String(previous_reading),
      current_reading: String(current_reading),
      units_used: String(units_used),
      rate_per_unit: rate_per_unit.value.unit,
      electricity_bill: String(electricity_bill),
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
    message: "Bills created successfully",
  });
};

// id: serial().primaryKey(),
//   renter_id: integer()
//     .references(() => renterTable.id)
//     .notNull(),
//   billing_month: timestamp().notNull(),
//   previous_reading: varchar().notNull(),
//   current_reading: varchar().notNull(),
//   units_used: varchar().notNull(),
//   rate_per_unit: integer().notNull(),
//   electricity_bill: varchar().notNull(),
//   created_at: timestamp().notNull(),

export const getPreviousReadingById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await fromPromise(
    db
      .select()
      .from(billsTable)
      .where(eq(billsTable.id, Number(id)))
      .orderBy(desc(billsTable.created_at)),
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
    data: data.value[0],
  });
};
