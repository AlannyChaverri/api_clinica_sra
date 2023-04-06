const { Schema, model } = require("mongoose");

const SchemaPatient = new Schema({
  name: {
    type: String,
    required: [true, "El campo nombre es requerido"],
  },
  lastname: {
    type: String,
    required: [true, "El campo apellido es requerido"],
  },
  phone: {
    type: String,
    required: [false, "El campo teléfono"],
  },
  dni: {
    type: String,
    required: [true, "El campo cedula es requerido"],
  },
  weight: {
    type: String,
    required: [true, "El campo peso es requerido"],
  },
  age: {
    type: String,
    required: [true, "El campo edad es requerido"],
  },
  height: {
    type: String,
    required: [true, "El campo altura es requerido"],
  },
  diseases: [
    {
      type: String,
      required: [true, "El campo enfermedades es requerido"],
    },
  ],
  allergicMedicines: [
    {
      type: String,
      required: [true, "El campo alergicos es requerido"],
    },
  ],
  bloodType: {
    type: String,
    required: [true, "El campo tipo sangre es requerido"],
  },
  bloodPressure: {
    type: String,
    required: [true, "El campo presion arterial es requerido"],
  },
  emergencyContact: [
    {
      name: {
        type: String,
        required: [
          true,
          "El campo nombre del contacto de emergencia es requerido",
        ],
      },
      phone: {
        type: String,
        required: [
          true,
          "El campo teléfono del contacto de emergencia es requerido",
        ],
      },
      relationship: {
        type: String,
        required: [
          true,
          "El campo parentezco del contacto de emergencia es requerido",
        ],
      },
      address: {
        type: String,
        required: [
          true,
          "El campo direccion del contacto de emergencia es requerido",
        ],
      },
    },
  ],
});

module.exports = model("patient", SchemaPatient);
