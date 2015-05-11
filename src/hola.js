'use strict';

function hola (robot) {
  robot.brain.on('loaded', loaded);
  robot.enter(entering);
  robot.respond(/hola clear$/i, clear);
  robot.respond(/hola list$/i, list);
  robot.respond(/hola rm (\d+)$/i, rm);
  robot.respond(/hola add (.*)$/i, add);
  robot.respond(/(hola|saludame|hodor|buenas)$/i, salute);

  function entering (command) {
    var user = command.message.user.name;
    var users = robot.brain.usersForFuzzyName(user);
    var stored_users = robot.brain.get('hola.users') || [];
    if (stored_users.indexOf(users) === -1) {
      salute(command);
      robot.brain.set('hola.users', user);
    }
  }

  function clear (command) {
    robot.brain.set('hola.messages', []);
    command.send('Hodor.');
  }

  function rm (command) {
    var all = robot.brain.get('hola.messages') || [];
    all.splice(parseInt(command.match[1], 10), 1);
    robot.brain.set('hola.messages', all);
    command.send('Hodor.');
  }

  function list (command) {
    var all = robot.brain.get('hola.messages') || [];
    command.send('Hodor.\n' + all.map(withIndex).join('\n'));
  }

  function withIndex (message, i) {
    return i + '. ' + message;
  }

  function add (command) {
    var all = robot.brain.get('hola.messages') || [];
    var message = command.match[1].trim().replace(/(^["'])|(["']$)/g, '');
    all.push(message);
    robot.brain.set('hola.messages', all);
    command.send('Hodor.');
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
