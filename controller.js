'use strict';

var response = require('./res');
var connection = require('./conn');
var bcrypt = require('bcryptjs');


// index
exports.index = function (req, res) {
     response.send("REST API with Express","", res)
};

// get
exports.users = function (req, res) {
     connection.query('SELECT * FROM users', function (error, rows, fields) {
          if (error) {
               console.log(error)
          } else {
               response.send("Data Found",rows, res)
          }
     });
};


// post register
exports.register = function (req, res) {

     var username = req.body.username;
     var email = req.body.email;
     var password = req.body.password;
     var hash = bcrypt.hashSync(password);
     var now = new Date();
     

     connection.query('INSERT INTO users(username, email, password, created_at, updated_at) values (?,?,?,?,?)',
          [username, email, hash, now, now],
          function (error, rows, fields) {
               if (error) {
                    console.log(error)
                    response.validateError(error,res)
               } else {
                    response.send("Register Success!",rows, res)
               }
          });
};

// post login
exports.login = function (req, res) {

     var username = req.body.username;
     var password = req.body.password;

     connection.query('SELECT * FROM users where username = ?',
          [username],
          function (error, rows, fields) {
               if (error) {
                    console.log(error)
                    response.validateError(error, res)
               } else {

                    if (rows.length==0){
                         response.badCredentials(res);
                    }else{
                         var storepass = rows[0]['password']
                         var cekpassword = bcrypt.compareSync(password, storepass);

                         console.log("password : "+ password)
                         console.log("storepass : " + storepass)
                         console.log("cekpassword  : " + cekpassword)

                         if(cekpassword){
                              response.send("Login Success!", rows, res)
                         }else{
                              response.validateError("Invalid Password", res)
                         }
        
                    }
                    
               }
          });
};

