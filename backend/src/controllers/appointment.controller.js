import Appointment from "../models/Appointment.js";


export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({
      date: 1,
      startTime: 1,
    });

    res.json({
      success: true,
      data: appointments,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


export const bookAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const slot = await Appointment.findById(id);

    if (!slot) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Prevent booking past appointments
    if (new Date(slot.date) < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Cannot book past appointment",
      });
    }

    // Only one booking per day
    const start = new Date(slot.date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(slot.date);
    end.setHours(23, 59, 59, 999);

    const existingBooking = await Appointment.findOne({
      bookedBy: req.user.id,
      date: {
        $gte: start,
        $lte: end,
      },
      status: "BOOKED",
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "Only one appointment allowed per day",
      });
    }

    // Atomic booking
    const appointment = await Appointment.findOneAndUpdate(
      {
        _id: id,
        status: "AVAILABLE",
      },
      {
        status: "BOOKED",
        bookedBy: req.user.id,
      },
      {
        new: true,
      }
    );

    if (!appointment) {
      return res.status(400).json({
        success: false,
        message: "Slot already booked",
      });
    }

    res.json({
      success: true,
      message: "Appointment booked successfully",
      data: appointment,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};


export const getMyAppointments = async (req, res) => {

    try{

        const appointments = await Appointment
        .find({
            bookedBy:req.user.id
        })
        .sort({
            date:-1
        });

        res.json({
            success:true,
            data:appointments
        });

    }catch(err){

        res.status(500).json({
            success:false,
            message:err.message
        });

    }

};


export const cancelAppointment = async (req, res) => {

    try{

        const appointment = await Appointment.findById(req.params.id);

        if(!appointment){

            return res.status(404).json({
                success:false,
                message:"Appointment not found"
            });

        }

        if(String(appointment.bookedBy) !== req.user.id){

            return res.status(403).json({
                success:false,
                message:"Unauthorized"
            });

        }

        appointment.status = "AVAILABLE";
        appointment.bookedBy = null;

        await appointment.save();

        res.json({
            success:true,
            message:"Appointment cancelled"
        });

    }catch(err){

        res.status(500).json({
            success:false,
            message:err.message
        });

    }

};

