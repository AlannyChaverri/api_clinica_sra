const { request, response } = require("express");
const Usuario = require("../models/users");
var bcrypt = require("bcryptjs");
var GenerarJWT = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/googleVerify");

const login = async (req = request, res = response) => {
  try {
    const { email, password } = req.body;

    //Verificar si el email existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El email / password no son validos-Email",
      });
    }

    //Verificar si la password es
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "El email / password no son validos-Password",
      });
    }

    //Generamos el JsonWebToken
    const token = await GenerarJWT(usuario.id);

    //Modificamos el resultado antes de mostrar al usuario
    res.json({
      ok: true,
      msg: "Controllador login corriendo bien",
      usuario,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      ok: false,
      msg: "Error en la conexion. Hable con el administrador",
    });
  }
};

const googleSingIn = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    //Capturamos el usuario que esta solicitango logueo
    const googleUser = await googleVerify(id_token);

    //Tercer paso desestructurar y grabar en nuestra aplicacion
    //el usuario que se logueo en google
    const { name, email, picture } = googleUser;

    //Cuarto paso Generar la referencia para saber si el usuario ya existe

    let usuario = await Usuario.findOne({ email });

    if (!usuario) {
      const data = {
        name: name,
        email: email,
        //El hash se le delega a google
        password: "p",
        google: true,
        rol: "ADMIN",
      };
      usuario = new Usuario(data);
      await usuario.save();
    }

    //Generamos el JsonWebToken
    const token = await GenerarJWT(usuario.id);

    //Configuramos la salida
    res.status(200).json({
      msg: "Todo bien desde googleSignIn",
      /* 
        Esto va primero y tras hacer la validacion lo borramos para 
        solo devolver el usuario y el token 
         id_token,
         googleUser
        */
      usuario,
      token,
    });

    console.log("Creacion correcta del usuario en google");
  } catch (err) {
    console.log(err);
    res.status(400).json({
      ok: false,
      msg: "El token no se pudo verificar. Intentar con otro",
    });
  }
};

module.exports = {
  login,
  googleSingIn,
};
