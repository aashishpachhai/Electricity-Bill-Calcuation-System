import {
  integer,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core/columns";
import { pgTable } from "drizzle-orm/pg-core/table";
import { renterTable } from "./renters.model";

export const billsTable = pgTable("bills", {
  id: serial().primaryKey(),
  renter_id: integer()
    .references(() => renterTable.id)
    .notNull(),
  billing_month: timestamp().notNull(),
  previous_reading: varchar().notNull(),
  current_reading: varchar().notNull(),
  units_used: varchar().notNull(),
  rate_per_unit: integer().notNull(),
  electricity_bill: varchar().notNull(),
  created_at: timestamp().notNull(),
});
