import { integer, serial, timestamp } from "drizzle-orm/pg-core/columns";
import { pgTable } from "drizzle-orm/pg-core/table";

export const rateTable = pgTable("rate", {
  id: serial().primaryKey(),
  effective_from: timestamp().notNull(),
  rate_per_unit: integer().notNull(),
});
