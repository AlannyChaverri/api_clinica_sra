const mongoose = require("mongoose");

const SchemaAppointmento = new mongoose.Schema({
  patient: {
    name: {
      type: String,
      required: [true, "El campo nombre es requerido"],
    },
    lastname: {
      type: String,
      required: [true, "El campo apellido es requerido"],
    },
    dni: {
      type: String,
      required: [true, "El campo cedula es requerido"],
    },
    phone: {
      type: String,
      required: [true, "El campo telefono es requerido"],
    },
  },
  datehour: {
    type: Date,
    required: [true, "El campo fecha y hora es requerido"],
  },
  specialty: {
    type: String,
    required: [true, "El campo especialidad es requerido"],
  },
  doctor: {
    type: String,
    required: [true, "El campo doctor es requerido"],
  },
});

module.exports = mongoose.model("appointment", SchemaAppointmento);
