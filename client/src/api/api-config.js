const axios = require('axios');
if (process.env.environment === 'local'){
   axios.defaults.baseURL = 'http://localhost:9000'; //update with dev setting
}

