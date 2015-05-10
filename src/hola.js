'use strict';

function hola (robot) {
  robot.brain.on('loaded', loaded);
  robot.enter(entering);
  robot.respond(/hola (.*)$/i, add);

  function entering (msg) {
    var messages = robot.brain.get('hola.messages');
    var message = messages[Math.floor(Math.random() * messages.length)];
    var welcome = message.replace('%s', msg.message.user.name);
    var stored_users = robot.brain.get('hola.users');
    var users = robot.brain.usersForFuzzyName(msg.message.user.name);

    if (stored_users.indexOf(users) === -1) {
      msg.send(welcome);
      robot.brain.set('hola.users', msg.message.user.name);
    }
  }

  function add (msg) {
    var message = msg.match[1].trim();
    robot.brain.set('hola.messages', message);
    msg.send('Nueva bienvenida: ' + message);
  }

  function loaded () {
    var base = robot.brain.hola;
    base.messages = base.messages || [];
    base.users = base.users || [];
  }
}

module.exports = hola;
