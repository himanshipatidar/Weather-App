function loadCities() {
    const select = document.querySelector("select");
    cities.forEach(city => {
        const option = document.createElement("option");
        option.textContent = city;
        option.value = city;
        select.appendChild(option);
    });
     getWeather();
}

window.onload = loadCities;


async function getWeather() {
    const city = document.querySelector("select").value;
    const apiKey = '4c43ac62fc0ae8104513fc1a17d8deda';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const result = await response.json();

        console.log(result);

        if (result.cod !== 200) {
            alert(`Error: ${result.message}`);
            return;
        }

        document.getElementById("city-name").innerText = `${result.name}, ${result.sys.country}`;
        document.getElementById("date").innerText = `TimeZone: UTC ${result.timezone / 3600}`;
        document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`;
        document.getElementById("temperature").innerText = `Temperature: ${result.main.temp}°C`;
        document.getElementById("description").innerText = `${result.weather[0].description}`;
        document.getElementById("wind-speed").innerText = `Wind Speed: ${result.wind.speed} m/s`;

        document.querySelector(".weather-info").style.display = "flex";

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Failed to fetch weather data. Please try again later.");
    }
}

