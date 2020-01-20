
// import { config } from '../config.js'; TODO XXXX
const axios = require('axios');
if (process.env.environment === 'local'){
   axios.defaults.baseURL = 'http://localhost:9000'; //update with dev setting
}
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true

const authenticate = (data, cb) => {
   axios({
      method: 'post',
      url: '/api/users/authenticate',
      data: data,
   })
   .then((res) => {
      cb(null,res)
   })
   .catch(function (err) {
      cb(err)
   })
}

const register = (data, cb) => {
   axios({
      method: 'post',
      url: '/api/users/register',
      data: data,
   })
   .then((res) => {
      cb(null,res)
   })
   .catch(function (err) {
      cb(err)
   })
}

const me = (cb) => {
   axios({
       method: 'get',
       url: '/api/users/me'
    })
   .then((res) => {
      cb(null,res)
   })
   .catch(function (err) {
      cb(err)
   })
}

const logout = (cb) => {
   axios({
       method: 'get',
       url: '/api/users/logout'
    })
   .then((res) => {
      console.log(res)
      cb(null,res)
   })
   .catch(function (err) {
      cb(err)
   })
}

const sessions = (query, cb) => {
   axios({
       method: 'get',
       url: '/api/sessions'
    })
   .then((res) => {
      cb(null,res)
   })
   .catch(function (err) {
      cb(err)
   })
}

const session = (id, cb) => {

   axios({
       method: 'get',
       url: `/api/sessions/${id}`
    })
   .then((res) => {
       cb(null,res)
   })
   .catch(function (err) {

      cb(err)
   })
}

const sessionRegistration = (userId, sessionId, cb) => {
   
   axios({
      method: 'post',
      url: `/api/sessions/register/${sessionId}`,
      data: {userId},
   })
   .then((res) => {
      cb(null,res)
   })
   .catch(function (err) {
      cb(err)
   })
}

const sessionDeRegistration = (userId, sessionId, cb) => {
   
   axios({
      method: 'post',
      url: `/api/sessions/deregister/${sessionId}`,
      data: {userId},
   })
   .then((res) => {
      cb(null,res)
   })
   .catch(function (err) {
      cb(err)
   })
}


export default { 
   authenticate, 
   register,
   me, 
   logout, 
   sessions, 
   session, 
   sessionRegistration, 
   sessionDeRegistration 
}





