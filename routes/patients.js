const { Router } = require("express");
const { check } = require("express-validator");
const { validate_fields } = require("../middleware/validation-field");
const { validarJWT } = require("../middleware/validateJWT");
// const { db_ExistEmail } = require("../helpers/db_validates");

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
    check("patient", "El paciente es obligatorio").not().isEmpty(),
    check(
      "emergencyContact",
      "El contacto de emergencia es obligatorio"
    ).isEmpty(),

    validate_fields,
  ],
  patientsPOST
);

router.put("/:id", patientsPUT);

router.delete(
  "/:id",
  [
    validarJWT,
    check("id", "ID no valido en mongo").isMongoId(),
    validate_fields,
  ],

  patientsDELETE
);

module.exports = router;
