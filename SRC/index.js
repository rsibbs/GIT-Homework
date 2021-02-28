// Date & Time Functions

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#current-date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

// Temperature Functions

function displayTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#main-number").innerHTML =
    Math.round(response.data.main.temp);

  celsiusTemperature = response.data.main.temp;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML =response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round (response.data.wind.speed);

}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;

  let units = "metric";
  let apiKey = "b0bc2c913d7afe71d0022b225acfb5b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}


function displayFahrenheitTemperature(event){
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature*9)/5+2; 
  let mainTemperature = document.querySelector("#main-number");
  mainTemperature.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusTemperature = null;


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);


let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", displayFahrenheitTemperature);