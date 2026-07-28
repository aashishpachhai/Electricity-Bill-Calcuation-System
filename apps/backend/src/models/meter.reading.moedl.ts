import {
  integer,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core/columns";
import { pgTable } from "drizzle-orm/pg-core/table";
import { renterTable } from "./renters.model";

export const meterReadingTable = pgTable("meter_readings", {
  id: serial().primaryKey(),
  renter_id: integer()
    .references(() => renterTable.id)
    .notNull(),
  meter_reading: varchar().notNull(),
  created_at: timestamp().notNull(),
});
