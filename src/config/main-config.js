require("dotenv").config();
const path = require("path");
const viewsFolder = path.join(__dirname, "..", "views");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const session = require("express-session");
const flash = require("express-flash");
const passportConfig = require("./passport-config");
const cors = require("cors");

module.exports = {
  init(app, express){
    app.set('trust proxy', 1); 
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors({
      credentials: true,
      origin: 'http://localhost:3000'
    }));
    app.use(express.json())
    app.use(session({
      secret: process.env.cookieSecret,
      resave: false,
      saveUninitialized: false,
      cookie: { 
        maxAge: 1.21e+9, //set cookie to expire in 14 days
        httpOnly: false 
      } 
    }));
    app.use(flash());
    passportConfig.init(app);
    app.use((req,res,next) => {
      res.locals.currentUser = req.user;
      next();
    })
    
    if (process.env.NODE_ENV === 'production') {
      // Serve any static files
      app.use(express.static(path.join(__dirname,'..', '../client/build')))

      // Handle React routing, return all requests to React app
      app.get(['/profile', '/dashboard', '/session'], function(req, res) {
        res.sendFile(path.join(__dirname, '..', '../client/build/index.html'))
      });
    }
    app.use(express.static(path.join(__dirname, "..", "assets")));
  }
};