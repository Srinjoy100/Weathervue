function getWeather() {
  const key = "ee279a45f595e0a63d66e1f1c8438208";
  const city = document.getElementById("city").value;
  if (!city) {
    alert("Enter a City");
    return;
  }
  const currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`;
  fetch(currentWeather)
    .then(response => response.json())
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      console.error("Error fetching the current weather info:", error);
      alert("Error fetching the current weather info.Please Try Again.");
    });

  fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
      displayForecast(data.list);
    })
    .catch(error => {
      console.error("Error fetching the current weather info:", error);
      alert("Error fetching the current weather info.Please Try Again.");
    });
}

function displayWeather(data) {
  const tempDiv = document.getElementById("temp");
  const weatherInfo = document.getElementById("info");
  const weatherIcon = document.getElementById("icon");
  const weatherForecast = document.getElementById("hforecast");

  weatherInfo.innerHTML = "";
  weatherForecast.innerHTML = "";
  tempDiv.innerHTML = "";
  if (data.cod === "404") {
    weatherInfo.innerHTML = `<p>${data.message}</p>`;
  } else {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;
    const codeIcon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${codeIcon}@4x.png`;

    const htmlTemp = `<p>${temperature}°C</p>`;
    const htmlWeather = `
            <p>${cityName}</p>
            <p>${description}</p>
            `;
    tempDiv.innerHTML = htmlTemp;
    weatherInfo.innerHTML = htmlWeather;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;
    showImage();
  }
}
function displayForecast(hourlyData) {
  const hourlyForecast = document.getElementById("hforecast");
  const nextHours = hourlyData.slice(0, 8);
  nextHours.forEach((item) => {
    const dateTime = new Date(item.dt * 1000);
    const hour = dateTime.getHours();
    const temperature = Math.round(item.main.temp - 273.15);
    const codeIcon = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${codeIcon}.png`;
    const hourlyItem = `
            <div class="hourly">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly weather icon">
                <span>${temperature}°C</span>
            </div>
        `;
    hourlyForecast.innerHTML = hourlyForecast.innerHTML + hourlyItem;
  });
}
function showImage() {
  const weatherIcon = document.getElementById("icon");
  weatherIcon.style.display = "block";
}
