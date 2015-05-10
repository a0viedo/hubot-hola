# Description:
#   Sends a welcome message to the first thing someone new says something
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   hubot welcome <new welcome message> - Update the welcome message
#
# Author:
#   jjasghar

module.exports = (robot) ->
  robot.brain.on 'loaded', =>
    robot.brain.hola.messages ||= []
    robot.brain.hola.users ||= []

  robot.enter (msg) ->
    messages = robot.brain.get('hola.messages')
    message = messages[Math.floor(Math.random() * messages.length)]
    welcome = message.replace('%s', msg.message.user.name)
    stored_users = robot.brain.get('hola.users')
    users = robot.brain.usersForFuzzyName("#{msg.message.user.name}")
    if !(users in stored_users)
      msg.send welcome
      robot.brain.set 'hola.users', msg.message.user.name

  robot.respond /hola (.*)$/i, (msg) ->
    message = msg.match[1]
    robot.brain.set 'hola.messages', message.trim()
    msg.send "Added Hola message: #{message}"
