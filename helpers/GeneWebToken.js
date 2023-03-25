const jwt = require("jsonwebtoken");

const GenerarJWT = (id = "") => {
  return new Promise((resolve, reject) => {
    const payload = { id };

    const options = {
      expiresIn: "4h",
    };
    jwt.sign(
      payload,
      process.env.SECRETEORPRIVATEKEY,
      options,
      (err, token) => {
        // se puede hacer un operador ternario
        if (err) {
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = GenerarJWT;
