const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weatherImg = document.querySelector(".weather-img");
const temp = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const error = document.querySelector(".errorMessage");
const weatherBody = document.querySelector(".weather-body");

async function checkWeather(cityName) {
  const APIKEY = "69dfd00957f8ffa1bbcf1aaa17fb9288";
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKEY}`;

  const weatherData = await fetch(`${URL}`).then((response) => response.json());

  if (weatherData.cod === "404") {
    error.style.display = "flex";
    weatherBody.style.display = "none";
    return;
  }

  error.style.display = "none";
  weatherBody.style.display = "flex";

  temp.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;

  description.innerHTML = `${weatherData.weather[0].description}`;

  humidity.innerHTML = `${weatherData.main.humidity}%`;

  windSpeed.innerHTML = `${weatherData.wind.speed}Km/H`;

  switch (weatherData.weather[0].main) {
    case "Clouds":
      weatherImg.src = "./Images/clouds.png";
      break;
    case "Clear":
      weatherImg.src = "./Images/clear.png";
      break;
    case "Rain":
      weatherImg.src = "./Images/rain.png";
      break;
    case "Mist":
      weatherImg.src = "./Images/mist.png";
      break;
    case "Snow":
      weatherImg.src = "./Images/snow.png";
      break;
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
});
