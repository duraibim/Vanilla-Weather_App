function showWeather(response) {
    console.log(url);

    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML= Math.round(response.data.main.temp);

    let nameCity = document.querySelector("#city");
    nameCity.innerHTML= response.data.name;

    let weatherDescription = document.querySelector("#description");
    weatherDescription.innerHTML= response.data.weather[0].description;

    let humidity = response.data.main.humidity;

    let humidityLevel = document.querySelector("#humidity");
    humidityLevel.innerHTML= `Humidity : ${humidity} %`;

    let wind = Math.round(response.data.wind.speed);

    let windSpeed = document.querySelector("#wind");
    windSpeed.innerHTML= `Wind : ${wind} km`;
}


let apiKey = "0196dac33373aaa2798921754f07b116";
let url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;


// let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(url).then(showWeather);

