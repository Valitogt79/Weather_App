// api key  OpenWeatherAPI: 96f6ba150dbfde1782395bffef95d6a2;

const d = document,
  $iconElement = d.querySelector(".weather.icon"),
  $tempElement = d.querySelector(".temperature-value p"),
  $descElement = d.querySelector(".temperature-description"),
  $locationElement = d.querySelector(".location p"),
  $notificationElement = d.querySelector(".notification");

//App data

const weather = {};
weather.temperature = {
  unit: "celsius",
};

//Const and Variables
const KELVIN = 273;

//API KEY
const key = "96f6ba150dbfde1782395bffef95d6a2";

//Check if the browser supports Geolocalization
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  $notificationElement.style.display = "block";
  $notificationElement.innerHTML = `<p>Browser doesn´t support Geolocalization`;
}

//Set User Position
function setPosition(position) {
  let latitude = position.coords.latitude,
    longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

//Show Error when there is an issue with geolocalization service
function showError(error) {
  $notificationElement.style.display = "block";
  $notificationElement.innerHTML = `<p>${error.message}`;
}

// Get weather from API provider
function getWeather(latitude, longitude) {
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })

    .then(function (data) {
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })

    .then(function () {
      displayWeather();
    });
}

//display Weather to UI
function displayWeather() {
  $iconElement.innerHTML = `<img src="../Assets/icons/${weather.iconId}.png">`;
  $tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;
  $descElement.innerHTML = weather.description;
  $locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}
