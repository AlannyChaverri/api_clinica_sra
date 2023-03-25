const { Router } = require("express");
const { login, loginView } = require("../controllers/auth");

const router = Router();

router.get("/IniciarSesion", loginView);

router.post("/login", login);

module.exports = router;
