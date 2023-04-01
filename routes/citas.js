const { Router } = require("express");
const { validate_fields } = require("../middleware/validation-field.js");
const { check } = require("express-validator");

const router = Router();

const {
  citasGET,
  doctorGET,
  citasGETPOST,
  citasHorarioPOST,
  horariosGet,
  createCitaGET,
  saveCitaPOST,
  deteleCita,
} = require("../controllers/citas.js");

//lista de citas y elegir fecha y doctor para una cita
router.get("/citas", citasGET);
router.get("/doctors", doctorGET);
router.get("/", citasGETPOST);
//lista de horarios Disponibles
router.get("/listHorarios/:doctor", horariosGet);
//lista de pacientes para crear la cita
router.get("/createCita/:doctor", createCitaGET);

router.post("/horarios", citasHorarioPOST);

//manda los datos de la cita
router.post("/createCita", saveCitaPOST);

router.post(
  "/createCita",
  [
    check("id_Patient", "El paciente es obligatorio").not().isEmpty(),
    check("horario", "Este email no es valido").not().isEmpty(),
    check("idDoctor", "El doctor es obligatorio").not().isEmpty(),
    validate_fields,
  ],
  saveCitaPOST
);

//cambia de estado de la cita
router.delete("/deteleCita/:id", deteleCita);
module.exports = router;
