import { Request, Response } from "express";
import { fromPromise } from "neverthrow";
import { db } from "../db/db";
import { renterTable } from "../models/renters.model";
export const createRenter = async (req: Request, res: Response) => {
  const { name, room_number, email, phone } = req.body;
  if (!name || !room_number || !email || !phone) {
    return res.status(400).json({
      success: false,
      message: "Some fields might be missing",
    });
  }
  const data = await fromPromise(
    db.insert(renterTable).values({
      email,
      name,
      phone,
      room_number,
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
    message: "Renter inserted successfully",
  });
};
//   id: serial().primaryKey(),
//   name: varchar().notNull(),
//   room_number: integer().notNull(),
//   email: varchar().notNull(),
//   phone: varchar().notNull(),
//   status: boolean().default(true),
