
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



export default { 
   authenticate, 
   register
}





