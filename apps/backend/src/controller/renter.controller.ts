import { Request, Response } from "express";
import { fromPromise } from "neverthrow";
import { db } from "../db/db";
import { renterTable } from "../models/renters.model";
import { eq } from "drizzle-orm";
import { sendRenterMail } from "../utils/nodemailer";
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

export const editRenter = async (req: Request, res: Response) => {
  const { name, room_number, email, phone, status } = req.body;
  const { id } = req.params;
  if (!name || !room_number || !email || !phone || !id || !status) {
    return res.status(400).json({
      success: false,
      message: "Some fields might be missing",
    });
  }
  const data = await fromPromise(
    db.update(renterTable).set({
      email,
      name,
      phone,
      room_number,
      status,
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
    message: "Renter updated successfully",
  });
};

export const getAllRenter = async (req: Request, res: Response) => {
  const data = await fromPromise(
    db.select().from(renterTable).where(eq(renterTable.status, true)),
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
    data: data.value,
  });
};

export const sendMail = async (req: Request, res: Response) => {
  await sendRenterMail("nyennhi1901@gmail.com", 222, 111, 15);
  res.status(200).json({
    success: true,
    message: "Mail sent successfully",
  });
};
