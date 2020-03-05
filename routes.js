'use strict';

module.exports = function (app) {
     var c = require('./controller');

     app.route('/').get(c.index);
     app.route('/users').get(c.users);
     app.route('/register').post(c.register);
     app.route('/login').post(c.login);

};