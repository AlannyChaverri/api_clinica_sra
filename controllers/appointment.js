const { request, response } = require("express");
const Appointment = require("../models/appointment");
var bcrypt = require("bcryptjs");

const appointmentGETPOST = async (req = request, res = response) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json({
      msg: "Mensaje desde el metodo GET",
      appointments,
    });
  } catch (err) {
    console.log(err);
    throw new Error("Error en el metodo GET");
  }
};

const appointmentPOST = async (req = request, res = response) => {
  try {
    const { patient, datehour, specialty, doctor } = req.body;
    const appointment = new Appointment({
      patient,
      datehour,
      specialty,
      doctor,
    });

    await appointment.save();

    res.json({
      ok: 200,
      msg: "Mensaje desde el metodo POST",
      appointment,
    });
  } catch (err) {
    console.log(err);
    throw new Error("Error en el metodo POST");
  }
};

const appointmentPUT = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    //
    const { specialty, doctor, ...resto } = req.body;

    if (specialty) {
      const salt = bcrypt.genSaltSync();
      resto.specialty = bcrypt.hashSync(specialty, salt);
    }

    const updated = await Appointment.findByIdAndUpdate(id, resto);
    res.json({
      ok: 200,
      msg: "Mensaje desde el metodo PUT",
      updated,
    });
  } catch (err) {
    console.log(err);
    throw new Error("Error en el metodo PUT");
  }
};

const appointmentDELETE = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndDelete(id);

    res.json({
      ok: 200,
      msg: "Mensaje desde el metodo DELETE",
      appointment,
    });
  } catch (err) {
    console.log(err);
    throw new Error("Error en el metodo DELETE");
  }
};

module.exports = {
  appointmentGETPOST,
  appointmentPOST,
  appointmentPUT,
  appointmentDELETE,
};
