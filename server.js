// ================================================================
// get all the modules that i need
// ================================================================
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
//load hbs in, to config express for handlebars partials
const hbs = require("hbs");
const app = express();
const routes = require("./routes/index");

// ================================================================
// setup application
// ================================================================
app.set("port", process.env.PORT || 3000);

const viewsPath = path.join(__dirname, "/views");
const partialsPath = path.join(__dirname, "/views/partials");
//Set up handlebars engine and view location
//set up handlebars as template engine to render dynamic doc
//pointing express to our custom 'views' directory
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static("public"));

//routes

// middleware setting for parsing bodies from URL
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(require("./routes/index"));

/*  #################################################################
Start Server and listening */

app.listen(app.get("port"));

//only for test initial construction
//app.listen(app.get('port'), ()=> {
//    console.log(`Server on port ${3000}`); } );
