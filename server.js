const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const bodyParser = require("body-parser");
// const config = require("config");
const Routes = require("./routes/api/routes");
const User = require("./models/User");
const port = process.env.PORT;
const path = require("path");
const passport = require("passport");
// const dotenv = require('dotenv').config();
const colors = require("colors");
// Db Config:
// const db = config.get("mongoURI");
const connectDB = require("./config/db");
// const sessionSecret = process.env.SESSION_SECRET;
connectDB();




/* TEMPORARY! REMOVE AND MODULIZE LATER! :D */

const SESSION_SECRET = "SwordFish";
/* END*/




// app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// mongoose.set('strictQuery', true);
// mongoose.set('useNewUrlParser', true);

// Passport Middleware:
app.use(passport.initialize());



// Declare paths, static and parsers middle ware:
// app.use(express.static(path.join(__dirname + "/public")));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true}));


// Session MIDDLEWARE:
const session = require("express-session");
var sess = {
  secret: 'TEMP PASS',
  cookie: {maxAge: 600000}
}
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}
app.use(session(sess))

// -----------------------------------------

// Flash Error Messages
const flash = require("express-flash");
app.use(flash());

// Routes:
app.use("/", Routes);



// Listening
app.listen(port, () => {
  console.log(`Server Running On Port: ${port}`)
});