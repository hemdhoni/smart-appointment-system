import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import seedAppointments from "./src/utils/seedAppointments.js";

const PORT = process.env.PORT || 5000;

await connectDB();

await seedAppointments();

app.listen(PORT, () => {
  console.log(`🚀 Server Running on ${PORT}`);
});