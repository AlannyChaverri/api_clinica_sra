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
    required: [false, "El campo peso "],
  },
  age: {
    type: String,
    required: [true, "El campo edad es requerido"],
  },
  height: {
    type: String,
    required: [false, "El campo altura "],
  },
  diseases: [
    {
      type: String,
      required: [false, "El campo enfermedades "],
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
    required: [false, "El campo tipo sangre"],
  },
  bloodPressure: {
    type: String,
    required: [false, "El campo presion arterial "],
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
