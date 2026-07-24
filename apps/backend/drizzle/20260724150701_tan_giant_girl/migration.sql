CREATE TABLE "bills" (
	"id" serial PRIMARY KEY,
	"renter_id" integer NOT NULL,
	"billing_month" timestamp NOT NULL,
	"previous_reading" varchar NOT NULL,
	"current_reading" varchar NOT NULL,
	"units_used" varchar NOT NULL,
	"rate_per_unit" integer NOT NULL,
	"electricity_bill" varchar NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "meter_readings" (
	"id" serial PRIMARY KEY,
	"renter_id" integer NOT NULL,
	"meter_reading" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rate" (
	"id" serial PRIMARY KEY,
	"effective_from" timestamp NOT NULL,
	"rate_per_unit" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "renter" (
	"id" serial PRIMARY KEY,
	"name" varchar NOT NULL,
	"room_number" integer NOT NULL,
	"email" varchar NOT NULL,
	"phone" varchar NOT NULL,
	"status" boolean DEFAULT true
);
--> statement-breakpoint
ALTER TABLE "bills" ADD CONSTRAINT "bills_renter_id_renter_id_fkey" FOREIGN KEY ("renter_id") REFERENCES "renter"("id");--> statement-breakpoint
ALTER TABLE "meter_readings" ADD CONSTRAINT "meter_readings_renter_id_renter_id_fkey" FOREIGN KEY ("renter_id") REFERENCES "renter"("id");