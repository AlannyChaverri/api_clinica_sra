const { request, response } = require("express");
const Usuario = require("../models/users");
const bcrypt = require("bcryptjs");
const GenerarJWT = require("../helpers/GeneWebToken");

const loginView = async (req = request, res = response) => {
  try {
    // const rol = { rol: "public", google: true };
    //const {limit}=req.query;
    res.render("login");
  } catch (err) {
    console.log(err);
    throw new Error("Error en el metodo GET");
  }
};

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    return res.status(400).json({
      ok: false,
      msg: "Email no existe",
    });
  }

  const passwordVlidate = bcrypt.compareSync(password, usuario.password);
  if (!passwordVlidate) {
    return res.status(400).json({
      ok: false,
      msg: "Email o password invalido",
    });
  }

  const token = await GenerarJWT(usuario.id);
  return res.status(200).json({
    ok: true,
    msg: "Inicio de sesion exitoso",
    email,
    password,
    token,
  });
};

module.exports = { login, loginView };
