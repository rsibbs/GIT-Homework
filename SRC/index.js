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

// Temperature Function for Search Button

function displayTemperature(response) {

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#main-number").innerHTML =
    Math.round(response.data.main.temp);

  celsiusTemperature = response.data.main.temp;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML =response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round (response.data.wind.speed);

}

// Temperature function for the Forecast
function displayForecast(response){
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = `
  <div class="col-2">
    <p2> 
    
    <div class = "weather-forecast-temperature">
    <strong> 3º</strong> 3º
    </div>

     <br /> 

    <img
      src = ""
      alt = ""
      />
    
    <br /> 
    
    Monday 
    
    <p2>
    </div>
  
  
  
  
  
  
  
  `

//  <div class="col-1">
               // </div>

                

               // <div class="col-2">
                  //  <p2> <strong> 1º </strong> 3º<br /> 🌧 <br /> Tuesday <p2>
             //   </div>

              //  <div class="col-2">
                 //   <p2> <strong> 3º </strong> 3º <br /> ⛅️ <br /> Wednesday <p2>
               // </div>

               // <div class="col-2">
                 //   <p2> <strong> 4º </strong> 3º<br /> 🌤 <br /> Thursday <p2>
               // </div>

              //  <div class="col-2">
               //     <p2> <strong> 4º </strong> 3º <br /> ☁️ <br /> Friday <p2>
            //    </div>

              //  <div class="col-1">
             //   </div>

}



function search(city){
  let units = "metric";
  let apiKey = "b0bc2c913d7afe71d0022b225acfb5b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);


  apiUrl = `api.openweathermap.org/data/2.5/forecast?q= ${city}&appid=${apiKey}&units=${units}`; 
  axios.get(apiUrl).then(displayForecast);
}


function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search (cityInputElement.value);
  displayTemperature(cityInputElement.value);
}


function displayFahrenheitTemperature(event){
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature*9)/5+2; 
  let mainTemperature = document.querySelector("#main-number");
  mainTemperature.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusTemperature = null;


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);


let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", displayFahrenheitTemperature);

search("Toronto");
