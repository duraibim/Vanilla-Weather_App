



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

function showWeather(response) {
    console.log(url);

    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML= Math.round(response.data.main.temp);

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


let apiKey = "0196dac33373aaa2798921754f07b116";
let city = "London";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(url).then(showWeather);

