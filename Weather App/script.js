const btn = document.querySelector("#search");
let input = document.querySelector("#input");
let temp = document.querySelector("#temp");
let city = document.querySelector("#city");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let weather = document.querySelector("#weatherStatus");
let msg = document.querySelector("#guide");
let weatherIcon = document.querySelector("#weatherPng");
const windDir = document.querySelector(".wind_direction .windData");
const sunTime = document.querySelector(".sunTime .windData");

const apiKey = `b359f54d5c55bc42bce549c64a03e133`;
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=`;

async function checkWeather(cityName) {
    try {
        if (!cityName) {
            msg.textContent = "* Please enter the valid city name!";
            return;
        }

        const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);

        if (!response.ok) {
            msg.textContent = "* Please enter the valid city name!";
            return;
        }

        const data = await response.json();
        console.log(data);

        // Update weather info
        city.innerHTML = data.name;
        temp.innerHTML = Math.round(data.main.temp) + " °C";
        humidity.innerHTML = Math.round(data.main.humidity) + " %";
        wind.innerHTML = Math.round(data.wind.speed) + " km/hr";
        weather.innerHTML = data.weather[0].main;

        const weatherCondition = data.weather[0].main;

        // Set weather image based on condition
        if (weatherCondition === "Clear") {
            weatherIcon.src = "Assets/Icons/sun.png";
        } else if (weatherCondition === "Clouds") {
            weatherIcon.src = "Assets/Icons/cloudy.png";
        } else if (weatherCondition === "Rain") {
            weatherIcon.src = "Assets/Icons/rain.png";
        } else if (weatherCondition === "Drizzle") {
            weatherIcon.src = "Assets/Icons/drizzle.png";
        } else if (weatherCondition === "Thunderstorm") {
            weatherIcon.src = "Assets/Icons/storm.png";
        } else if (weatherCondition === "Snow") {
            weatherIcon.src = "Assets/Icons/snow.png";
        } else if (
            weatherCondition === "Mist" ||
            weatherCondition === "Haze" ||
            weatherCondition === "Fog"
        ) {
            weatherIcon.src = "Assets/Icons/fog.png";
        } else {
            weatherIcon.src = "Assets/Icons/404.png"; // fallback icon
        }

        // Day and Date Time.
        const timeDiv = document.getElementById('time');
        const date = new Date();

        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        const formattedDate = `${day} ${month}, ${year}`;

        timeDiv.textContent = formattedDate;

        const deg = data.wind.deg;
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        const dirIndex = Math.round(deg / 45) % 8;
        const windDirectionText = `${deg}° (${directions[dirIndex]})`;
        windDir.textContent = windDirectionText;

        // ---- SUNRISE & SUNSET ----
        const sunriseUnix = data.sys.sunrise;
        const sunsetUnix = data.sys.sunset;

        // Convert Unix time to readable format
        const sunriseTime = new Date(sunriseUnix * 1000).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
        const sunsetTime = new Date(sunsetUnix * 1000).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });

        sunTime.textContent = `${sunriseTime} / ${sunsetTime}`;

    } catch (error) {
        console.error(error);
        city.innerHTML = "City not found";
        temp.innerHTML = "--";
        humidity.innerHTML = "--";
        wind.innerHTML = "--";
        weather.innerHTML = "--";
        windDir.innerHTML = "--";
        sunTime.innerHTML = "--";
    }
}

btn.addEventListener('click', () => {
    checkWeather(input.value.trim());
    input.value = "";
    msg.textContent = "";
});

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        btn.click();
    }
});
