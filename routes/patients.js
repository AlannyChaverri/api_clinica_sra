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
    check("name", "El name es obligatorio").not().isEmpty(),
    check("lastname", "El lastname es obligatorio").not().isEmpty(),
    check("phone", "El phone es obligatorio").not().isEmpty(),
    check("dni", "El dni es obligatorio").not().isEmpty(),
    check("weight", "El weight es obligatorio").not().isEmpty(),
    check("age", "El age es obligatorio").not().isEmpty(),
    check("height", "El height es obligatorio").not().isEmpty(),
    check("diseases", "El diseases es obligatorio").not().isEmpty(),
    check("allergicMedicines", "El allergicMedicines es obligatorio")
      .not()
      .isEmpty(),
    check("bloodType", "El bloodType es obligatorio").not().isEmpty(),
    check("bloodPressure", "El bloodPressure es obligatorio").not().isEmpty(),
    check("emergencyContact", "El contacto es obligatorio").not().isEmpty(),

    validate_fields,
  ],
  patientsPOST
);

router.put("/:id", patientsPUT);

router.delete("/:id", patientsDELETE);

module.exports = router;
