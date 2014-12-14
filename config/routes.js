var index = require('../routes/index');
var meetup = require('../routes/meetup');
var users = require('../routes/users');


module.exports = function (app){
      app.use('/', index);
      app.use('/meetup',meetup);
      app.use('/user',users);
}