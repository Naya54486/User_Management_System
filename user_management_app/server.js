const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require('path')

const connectDB = require('./server/database/connection')

const app = express();

dotenv.config({path: 'config.env'})
const PORT = process.env.PORT || 8080

//log requests
app.use(morgan("tiny"));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyParser.urlencoded({extended: true}))

// set view engine
app.set('view engine', 'ejs')
// app.set('views', path.resolve(__dirname, "views/ejs"))

// load static files
app.use('/css', express.static(path.join(__dirname,'public/css')));
app.use('/js', express.static(path.resolve(__dirname,'public/js')));
app.use('/img', express.static(path.resolve(__dirname,'public/img')));

// load routers
app.use('/', require('./server/routes/router'))

app.listen(PORT, () => {console.log(`server listening on http://localhost:${PORT}`)})