const { Router } = require("express");
const { check } = require("express-validator");
const { validate_fields } = require("../middleware/validation-field");

const { login, googleSingIn } = require("../controllers/auth");

const router = Router();
// router.get("/IniciarSesion", loginView);
router.post(
  "/login",
  [
    check("email", "Debe enviar un email valido").isEmail(),
    check("password", "Debe enviar una contraseña").not().isEmpty(),
    validate_fields,
  ],
  login
);

//Duplicamos el login y lo renombramos por google
//con la diferencia que en vez de mandar el password
//deben enviar el id_token

router.post(
  "/google",
  [
    check("id_token", "El id_token es necesario").not().isEmpty(),
    validate_fields,
  ],
  googleSingIn
);

module.exports = router;
