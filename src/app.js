const port = process.env.PORT || 3000;
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views"); //main pages
const partialsPath = path.join(__dirname, "../templates/partials"); //partials pages

//Setup handlerbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath); //views path is mentioned by viewsPath
hbs.registerPartials(partialsPath); //registering the hbs for header and footer

//Setup statics directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  //index.hbs
  res.render("index", {
    title: "Weather",
    name: "Puja Sharma",
  });
});

app.get("/about", (req, res) => {
  //slash about is for website
  res.render("about", {
    //here 'about' is about.hbs folder
    title: "About page",
    name: "Puja Sharma",
  });
});

app.get("/help", (req, res) => {
  //help.hbs
  res.render("help", {
    title: "Help page",
    helpText: "Github project link here",
    name: "Puja Sharma",
  });
});

//INPUT FROM BROWSER
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

//INPUT FROM BROWSER
app.get("/products", (req, res) => {
  if (!req.query.search) {
    //only run when no search
    return res.send({
      //return because we can't send two things at a time
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found",
    name: "Puja Sharma",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "404 Page error",
    name: "Puja Sharma",
  });
});

app.listen(port, () => {
  console.log("Server is up on port 3000.");
});
