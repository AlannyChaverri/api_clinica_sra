const { Router } = require("express");
const { check } = require("express-validator");
const { validate_fields } = require("../middleware/validation-field");
const { db_ExistDNI } = require("../helpers/db_validates");

const {
  patientsGET,
  patientsGETPOST,
  patientsPOST,
  patientsPUT,
  patientsDELETE,
} = require("../controllers/patients");

const router = Router();

// router.get("/", patientsGET);

router.get("/", patientsGETPOST);
router.get("/usuarios", patientsGET);

router.post(
  "/",
  [
    check("name", "El name es obligatorio").not().isEmpty(),
    check("lastname", "El lastname es obligatorio").not().isEmpty(),
    check("dni", "El dni es obligatorio").not().isEmpty(),
    check("dni").custom((dni) => db_ExistDNI(dni)),
    check("age", "El age es obligatorio").not().isEmpty(),
    check("allergicMedicines", "El allergicMedicines es obligatorio")
      .not()
      .isEmpty(),
    check(
      "emergencyContact.*.name",
      "El campo nombre del contacto de emergencia es requerido"
    )
      .not()
      .isEmpty(),
    check(
      "emergencyContact.*.phone",
      "El campo teléfono del contacto de emergencia es requerido"
    )
      .not()
      .isEmpty(),
    check(
      "emergencyContact.*.relationship",
      "El campo parentezco del contacto de emergencia es requerido"
    )
      .not()
      .isEmpty(),
    check(
      "emergencyContact.*.address",
      "El campo direccion del contacto de emergencia es requerido"
    )
      .not()
      .isEmpty(),
    validate_fields,
  ],
  patientsPOST
);

router.put("/:id", patientsPUT);

router.delete("/:id", patientsDELETE);

module.exports = router;
