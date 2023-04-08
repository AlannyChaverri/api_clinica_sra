const express = require("express");
const cors = require("cors");
require("dotenv").config();
const conectorMONGO = require("../database/mongo");
const bodyParser = require("body-parser");

class Server {
  constructor() {
    this.app = express();
    this.app.use(cors());
    this.port = process.env.PORT;
    this.usersPath = "/api/users";
    this.patientsPath = "/api/patients";
    this.auth = "/api/auth";
    this.appointmentsPath = "/api/appointments";

    this.citaPath = "/api/citas";

    //invocamos nuestros metodos
    this.middleWares();
    this.routes();
    this.MongoDB();

    this.app.set("view engine", "ejs");
    this.app.set("views", __dirname + "/../views");
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(
        `*  http://127.0.0.1:${this.port}/api/auth/IniciarSesion    *`
      );
      console.log("*                                                  *");
      console.log(
        `*  Server -> http://127.0.0.1:${this.port}/api/users/      *`
      );
      console.log(
        `*  Server -> http://127.0.0.1:${this.port}/api/patients/   *`
      );
      console.log(
        `*  Server -> http://127.0.0.1:${this.port}/api/citas/      *`
      );
      console.log("*                                                  *");
      console.log(
        `*  El servidor esta corriendo en el puerto ${this.port}    *`
      );

      console.log("*                                                  *");
      console.log("****************************************************");
    });
  }

  routes() {
    this.app.use(this.usersPath, require("../routes/users"));
    this.app.use(this.patientsPath, require("../routes/patients"));
    this.app.use(this.appointmentsPath, require("../routes/citas"));
    this.app.use(this.auth, require("../routes/auth"));

    this.app.use(this.citaPath, require("../routes/citas"));
  }

  middleWares() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  MongoDB() {
    conectorMONGO();
  }
}

module.exports = Server;
