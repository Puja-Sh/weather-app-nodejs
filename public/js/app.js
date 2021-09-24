// const { response } = require("express")

console.log("Client side javascript file is loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageThree = document.querySelector("#message-3");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault(); //preventing from submission of form

  const location = search.value;
  console.log(location);
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch(
    "http://api.weatherstack.com/current?access_key=addea97588501dedeebfe93328b94425&query=" +
      location
  ).then((response) => {
    response.json().then((data) => {
      console.log(data);
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        console.log(data.current.temperature);
        // messageOne.textContent = forecast;
        // messageTwo.textContent = geocode;
        messageOne.textContent = `${data.location.name}, ${data.location.region}, ${data.location.country} `;
        messageTwo.textContent = `Weather is ${data.current.weather_descriptions[0]}, and temperatue is ${data.current.temperature} Kelvin.`;
        messageThree.innerHTML = `<div>Cloud cover: ${data.current.cloudcover} </div> <div>Humidity: ${data.current.humidity} </div> <div>Pressure: ${data.current.pressure} </div>`;
      }
    });
  });
});

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })
