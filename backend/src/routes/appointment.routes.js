import express from "express";
import auth from "../middleware/auth.middleware.js";
import {
  getAppointments,
  bookAppointment,
  getMyAppointments,
  cancelAppointment,
} from "../controllers/appointment.controller.js";

const router = express.Router();

router.get("/", getAppointments);

router.post("/:id/book", auth, bookAppointment);

router.get("/my", auth, getMyAppointments);

router.delete("/:id", auth, cancelAppointment);

export default router;