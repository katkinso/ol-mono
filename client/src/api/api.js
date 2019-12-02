
// import { config } from '../config.js';
const axios = require('axios');
// axios.defaults.baseURL = 'https://ol-mono.herokuapp.com/'; //update with dev setting
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


export default { authenticate, me, logout, sessions, session }





