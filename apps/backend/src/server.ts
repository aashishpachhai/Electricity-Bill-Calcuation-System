import express from "express";
import { billsRouter } from "./routes/bills.routes";
import { meterReadingRouter } from "./routes/meter.reading.routes";
import { rateRouter } from "./routes/rate.routes";
import { renterRouter } from "./routes/renter.routes";
import "../src/utils/nodemailer";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());
app.use("/bills", billsRouter);
app.use("/meter", meterReadingRouter);
app.use("/rate", rateRouter);
app.use("/renter", renterRouter);

app.listen(3000, () => {
  console.log("App is running on port", 3000);
});
