import Appointment from "../models/Appointment.js";

const seedAppointments = async () => {
  try {
    const count = await Appointment.countDocuments();

    if (count > 0) {
      console.log("Appointment slots already exist");
      return;
    }

    const slots = [];

    const today = new Date();

    // Generate slots for next 5 days
    for (let day = 0; day < 5; day++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + day);

      const timings = [
        ["09:00", "09:30"],
        ["10:00", "10:30"],
        ["11:00", "11:30"],
        ["12:00", "12:30"],
        ["02:00", "02:30"],
        ["03:00", "03:30"],
      ];

      for (const [start, end] of timings) {
        slots.push({
          date: currentDate,
          startTime: start,
          endTime: end,
          status: "AVAILABLE",
        });
      }
    }

    await Appointment.insertMany(slots);

    console.log(`✅ ${slots.length} appointment slots created`);

  } catch (err) {
    console.log(err.message);
  }
};

export default seedAppointments;