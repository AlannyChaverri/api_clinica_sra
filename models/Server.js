const express = require("express");
require("dotenv").config();
const conectorMONGO = require("../database/mongo");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = "/api/users";
    this.auth = "/api/auth";

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
        `*  Login -> http://127.0.0.1:${this.port}/api/auth/IniciarSesion *`
      );
      console.log("*                                                  *");
      console.log(
        `*  Server -> http://127.0.0.1:${this.port}/api/users/      *`
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
    this.app.use(this.auth, require("../routes/auth"));
  }

  middleWares() {
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  MongoDB() {
    conectorMONGO();
  }
}

module.exports = Server;
