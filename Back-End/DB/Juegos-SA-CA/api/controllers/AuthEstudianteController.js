/**
 * AuthEstudianteController
 *
 * @description :: Server-side logic for managing Authestudiantes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Passwords = require('machinepack-passwords');
var jwt = require('jsonwebtoken');

module.exports = {

  logIn:function (req,res) {
    var parametros = req.allParams()

    if(parametros.cedula&&parametros.contrasenia){
      Estudiante
        .findOne({
          cedula:parametros.cedula
        })
        .exec(function (err,usuarioEncontrado) {
          if(err) return res.serverError("Error",err);
          if(!usuarioEncontrado){
            return res.notFound("Estudiante no Encontrado");
          }else{
            Passwords.checkPassword({
              passwordAttempt: parametros.contrasenia,
              encryptedPassword: usuarioEncontrado.contrasenia,
            })
              .exec({
                error: function (err) {
                  return res.serverError(err);
                },
                incorrect: function () {
                  return res.ok("Datos Invalidos")
                },
                success: function () {
                  // devolver la credencial
                  var token = jwt
                    .sign(
                      {
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        data: {
                          id:usuarioEncontrado.id,
                          nombre:usuarioEncontrado.nombre,
                          cedula:usuarioEncontrado.cedula
                        }
                      },
                      'organizacionECU');

                  return res.ok(token);
                }
              });
          }

        });
    }else{
      return res.ok("No envia cédula y password");
    }
  },

  logOut:function (req,res) {

  },
  logInFacebook:function (req,res) {

  }
};

