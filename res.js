'use strict';

exports.send = function (message, data, res) {
     var response = {
          'status': 200,
          'message':message,
          'data': data
     };
     res.json(response);
     res.end();
};

exports.notFound = function (message, res) {
     var response = {
          'status': 404,
          'message': message + " not found",
     };
     res.json(response);
     res.end();
};


exports.exists = function (message, res) {
     var response = {
          'status': 400,
          'message': message + " already exists",
     };
     res.json(response);
     res.end();
};

exports.validateError = function ($errors, res) {
     var response = {
          'status': 422,
          'message': "Validation errors",
          'errors' : $errors,
     };
     res.json(response);
     res.end();
};

exports.internalError = function (res) {
     var response = {
          'status': 500,
          'message': "Internal server error",
     };
     res.json(response);
     res.end();
};

exports.badCredentials = function (res) {
     var response = {
          'status': 401,
          'message': "Username or password is wrong",
     };
     res.json(response);
     res.end();
};