



function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
    let minutes = date.getMinutes();
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
        "Saturday"
    ];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`
}

function formatHours(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
    let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function showWeather(response) {

    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML= Math.round(response.data.main.temp);

    celsiusTemp = response.data.main.temp;

    let cityElement = document.querySelector("#city");
    cityElement.innerHTML= response.data.name;

    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML= response.data.weather[0].description;

    let humidity = response.data.main.humidity;

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML= `Humidity : ${humidity} %`;

    let wind = Math.round(response.data.wind.speed);

    let windElement = document.querySelector("#wind");
    windElement.innerHTML= `Wind : ${wind} km`;

    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.dt * 1000);

    // let highElement = document.querySelector("#high");
    // highElement.innerHTML= Math.round(response.data.main.temp_min);

    // let lowElement = document.querySelector("#low");
    // lowElement.innerHTML= Math.round(response.data.main.temp_max);

    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
        );
      iconElement.setAttribute("alt", response.data.weather[0].description);
    
/// setAttribute --> to update the icon's src and alt///

}

function showForecast(response){
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;

    for (let index = 0; index < 6; index++){
        forecast = response.data.list[index];
        forecastElement.innerHTML +=`
        <div class="col-2">
            <h3> 
            ${formatHours(forecast.dt * 1000)} </h3>
            <img
            src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
            alt=""
            />
            <div calss="weather-forcast-temp"> <p>
                <strong>H:${Math.round(forecast.main.temp_max)}°</strong>  L:${Math.round(forecast.main.temp_min)}°
                </p></div>
        </div>
    `;
    }

}

function search(city) {
  let apiKey = "0196dac33373aaa2798921754f07b116";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);

  url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

function showFahrenheitTemp(event){
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML= Math.round(fahrenheitTemp);
}


function showCelsiusTemp(event){
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML= Math.round(celsiusTemp);
}


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);


search("London");