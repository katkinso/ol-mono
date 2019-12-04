const Session = require("./models").Session;
const UserSessions = require("./models").UserSessions;
const moment = require('moment');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  createSession(newSession, callback){
    return Session.create(newSession)
    .then((session) => {
      callback(null, session);
    })
    .catch((err) => {
      callback(err);
    })
  },
  getSession(id, callback){
    return Session.findByPk(id)
    .then((session) => {
      callback(null, session);
    })
    .catch((err) => {
      callback(err);
    })
  },
  getSessions(req, callback){
    return Session.findAll({
      where: {
        dateTime: {
          [Op.gte]: moment()
        }
      },
      order: [
        ['dateTime', 'ASC'],
        ['name', 'DESC']
      ]
    })
    .then((sessions) => {
      callback(null, sessions);
    })
    .catch((err) => {
      callback(err);
    })
  },
  getSession(id, callback){
    return Session.findByPk(id)
    .then((session) => {
      callback(null, session);
    })
    .catch((err) => {
      callback(err);
    })
  },
  registration(newUserSession, callback){
    return UserSessions.findAll({
      where: {
        userId: newUserSession.userId,
        sessionId: newUserSession.sessionId
      }
    }).then((record) => {
      //check user not already registered.
      if (!record.length){

          UserSessions.create(newUserSession)
          .then((session) => {
            callback(null, session);
          })
          .catch((err) => {
            callback(err);
          })

      }else{
          callback({registered:true});
      }
    }).catch((err) => {
         callback(err);
    })
  },
  delete(id, callback){
    return Session.destroy({
      where: { id }
    })
    .then((deletedRecordsCount) => {
      console.log(deletedRecordsCount)
      callback(null, deletedRecordsCount);
    })
    .catch((err) => {
      callback(err);
    })
  },
  deRegistration(userSession, callback){
    return UserSessions.destroy({
      where: {
        userId: userSession.userId,
        sessionId: userSession.sessionId
      }
    })
    .then((deletedRecordsCount) => {
      console.log(deletedRecordsCount)
      callback(null, deletedRecordsCount);
    })
    .catch((err) => {
      callback(err);
    })
  },
}

