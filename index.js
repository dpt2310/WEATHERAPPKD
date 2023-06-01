let now = new Date();

let h3 = document.querySelector("h3");
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
h3.innerHTML = `${day} ${month} ${date},</br>${hours}:${minutes}</br>70°/49°F`;

function search(city) {
  let apiKey = "cf1ef184bc4f8c6749a14597b0b5efe6";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function changeTemprature() {
  let h2 = document.querySelector("#temperature");
  h2.innerHTML = `19`;
}
let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", changeTemprature);

function switchTemprature() {
  let h2 = document.querySelector("#temperature");
  h2.innerHTML = `62`;
}
let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", switchTemprature);

function showWeather(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let h2 = document.querySelector("h2");
  let temperature = Math.round(response.data.main.temp);
  h2.innerHTML = `Currently ${temperature}°C`;
}

function retrievePosition(position) {
  let apiKey = "cf1ef184bc4f8c6749a14597b0b5efe6";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  search(city);
}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", showCity);
let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getCurrentLocation);
