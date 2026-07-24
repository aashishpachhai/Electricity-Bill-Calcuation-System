import { boolean, integer, serial, varchar } from "drizzle-orm/pg-core/columns";
import { pgTable } from "drizzle-orm/pg-core/table";

export const renterTable = pgTable("renter", {
  id: serial().primaryKey(),
  name: varchar().notNull(),
  room_number: integer().notNull(),
  email: varchar().notNull(),
  phone: varchar().notNull(),
  status: boolean().default(true),
});
