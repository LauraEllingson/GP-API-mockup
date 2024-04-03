// Selecting DOM elements
const form = document.querySelector('form');
const cityInput = document.getElementById('weather-search');
const section = document.getElementById('weather');

// Form submission event handling
form.onsubmit = async (e) => {
    e.preventDefault();

    const city = cityInput.value.trim();
    const weatherApiKey = '7e5379b3c6a4afecd1a36c6c82815e9d'; // Replace with your actual weather API key
    cityInput.value = "";

    if (city !== '') {
        try {
            // Fetch weather data
            const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${weatherApiKey}`);
            const weatherData = await weatherResponse.json();
            const { name, sys, coord, weather, main, dt } = weatherData;

            // Clear previous content
            section.innerHTML = "";

            // Display city name
            const cityName = document.createElement('h2');
            cityName.textContent = `${name}, ${sys.country}`;
            section.appendChild(cityName);

            // Display weather icon
            const { icon } = weather[0];
            const cityImg = document.createElement('img');
            cityImg.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            section.appendChild(cityImg);

            // Display weather description
            const { description } = weather[0];
            const weatherCon = document.createElement('p');
            weatherCon.textContent = description;
            weatherCon.classList.add('weather-description'); // Add a class for styling
            section.appendChild(weatherCon);

            // Display current temperature
            const { temp } = main;
            const current = document.createElement('p');
            current.textContent = `Current Temperature: ${temp}° F`;
            current.classList.add('current-temperature'); // Add a class for styling
            section.appendChild(current);

            // Display "Feels like" temperature
            const { feels_like } = main;
            const feelsLike = document.createElement('p');
            feelsLike.textContent = `Feels like: ${feels_like}° F`;
            feelsLike.classList.add('feels-like-temperature'); // Add a class for styling
            section.appendChild(feelsLike);

            // Display time of last update
            const time = new Date(dt * 1000);
            const timeString = time.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit'
            });
            const updatedParagraph = document.createElement('p');
            updatedParagraph.textContent = `Last updated: ${timeString}`;
            updatedParagraph.classList.add('last-updated-time'); // Add a class for styling
            section.appendChild(updatedParagraph);

            // Fetch sunrise and sunset data
            const sunriseSunsetResponse = await fetch(`https://api.sunrise-sunset.org/json?lat=${coord.lat}&lng=${coord.lon}&formatted=0`);
            const sunriseSunsetData = await sunriseSunsetResponse.json();

            // Display sunrise and sunset data
            const { sunrise, sunset } = sunriseSunsetData.results;
            const sunriseTime = new Date(sunrise);
            const sunsetTime = new Date(sunset);
            const sunriseParagraph = document.createElement('p');
            sunriseParagraph.textContent = `Sunrise: ${sunriseTime.toLocaleTimeString()}`;
            sunriseParagraph.classList.add('sunrise-time'); // Add a class for styling
            section.appendChild(sunriseParagraph);
            const sunsetParagraph = document.createElement('p');
            sunsetParagraph.textContent = `Sunset: ${sunsetTime.toLocaleTimeString()}`;
            sunsetParagraph.classList.add('sunset-time'); // Add a class for styling
            section.appendChild(sunsetParagraph);

        } catch (err) {
            section.innerHTML = "";
            const locErr = document.createElement('h2');
            locErr.textContent = 'Location not found.';
            section.appendChild(locErr);
            console.error("Error fetching weather data:", err);
        }
    }
};

