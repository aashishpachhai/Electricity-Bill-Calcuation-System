import nodemailer from "nodemailer";
import "dotenv/config.js";
// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST!,
  port: Number(process.env.SMTP_PORT),
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendRenterMail = async (
  email: string,
  currentReading: number,
  previousReading: number,
  ratePerUnit: number,
) => {
  const currentUnit = Math.abs(currentReading - previousReading);
  const totalAmount = currentUnit * ratePerUnit;
  try {
    const info = await transporter.sendMail({
      from: `${process.env.SMTP_USER}`,
      to: `${email}`,
      subject: "Hello",
      text: "Hello world?",
      html: `
  <h2 style="font-family: Arial, sans-serif; color: #333;">
    Electricity Bill
  </h2>

  <table
    style="
      border-collapse: collapse;
      width: 100%;
      max-width: 600px;
      font-family: Arial, sans-serif;
    "
    border="1"
    cellpadding="10"
  >
    <tr style="background-color: #f2f2f2;">
      <th align="left">Description</th>
      <th align="right">Value</th>
    </tr>

    <tr>
      <td>Recipient Email</td>
      <td align="right">${email}</td>
    </tr>

    <tr>
      <td>Previous Reading</td>
      <td align="right">${previousReading}</td>
    </tr>

    <tr>
      <td>Current Reading</td>
      <td align="right">${currentReading}</td>
    </tr>

    <tr>
      <td>Units Consumed</td>
      <td align="right">${currentUnit} Units</td>
    </tr>

    <tr>
      <td>Rate per Unit</td>
      <td align="right">Rs. ${ratePerUnit}</td>
    </tr>

    <tr style="font-weight: bold; background-color: #e8f5e9;">
      <td>Total Amount</td>
      <td align="right">Rs. ${totalAmount}</td>
    </tr>
  </table>

  <p style="margin-top:20px;font-family:Arial,sans-serif;">
    Thank you for your payment.
  </p>
`,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
};
