const Usuario = require("../models/users");

const db_ExistEmail = async (email = "") => {
  const existEmail = await Usuario.findOne({ email }).exec();
  if (existEmail) {
    console.log("El email ya existe");
    throw new Error("El email ya existe");
  }
};
module.exports = {
  db_ExistEmail,
};
