const { Router } = require("express");
const { check } = require("express-validator");
const { validate_fields } = require("../middleware/validation-field");
const { validarJWT } = require("../middleware/validateJWT");
const { db_ExistEmail } = require("../helpers/db_validates");

const {
  //   appointmentGET,
  appointmentGETPOST,
  appointmentPOST,
  appointmentPUT,
  appointmentDELETE,
} = require("../controllers/appointment");

const router = Router();

router.get("/", appointmentGETPOST);
// router.get("/citas", appointmentGET);

router.post(
  "/",
  [
    check("patient.name", "El campo nombre es obligatorio").not().isEmpty(),
    check("patient.lastname", "El campo apellido es obligatorio")
      .not()
      .isEmpty(),
    check("patient.phone", "El campo teléfono es obligatorio").not().isEmpty(),
    check("datehour", "El campo fecha y hora es obligatorio").not().isEmpty(),
    check("specialty", "El campo especialidad es obligatorio").not().isEmpty(),
    check("doctor", "El campo doctor es obligatorio").not().isEmpty(),
  ],
  appointmentPOST
);

router.put("/:id", appointmentPUT);

router.delete(
  "/:id",
  [
    validarJWT,
    check("id", "ID no valido en mongo").isMongoId(),
    validate_fields,
  ],

  appointmentDELETE
);

module.exports = router;
