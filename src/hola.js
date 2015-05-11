'use strict';

function hola (robot) {
  robot.brain.on('loaded', loaded);
  robot.enter(entering);
  robot.respond(/hola (.*)$/i, add);
  robot.respond(/saludame|hodor$/i, salute);

  function entering (command) {
    var user = command.message.user.name;
    var users = robot.brain.usersForFuzzyName(user);
    var stored_users = robot.brain.get('hola.users') || [];
    if (stored_users.indexOf(users) === -1) {
      salute(command);
      robot.brain.set('hola.users', user);
    }
  }

  function add (command) {
    var all = robot.brain.get('hola.messages') || [];
    var message = command.match[1].trim();
    all.push(message);
    robot.brain.set('hola.messages', all);
    command.send('Nueva bienvenida: ' + message);
  }

  function salute (command) {
    var messages = robot.brain.get('hola.messages') || ['Hola %s!'];
    var message = messages[Math.floor(Math.random() * messages.length)];
    var welcome = message.replace('%s', command.message.user.name);
    command.send(welcome);
  }

  function loaded () {
    var base = robot.brain.data;
    if (base === void 0) {
      base = {};
    }
    base.messages = base.messages || [];
    base.users = base.users || [];
  }
}

module.exports = hola;
