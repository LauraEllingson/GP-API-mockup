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

            // Display weather data (similar to your existing code)
            console.log({ name, sys, coord, weather, main }); // Logging destructured object
            section.innerHTML = ""; 

            const cityName = document.createElement('h2'); 
            cityName.textContent = `${name}, ${sys.country}`; 
            section.appendChild(cityName); 

            const { icon } = weather[0]; 
            const cityImg = document.createElement('img'); 
            cityImg.src = `https://openweathermap.org/img/wn/${icon}@2x.png`; 
            section.appendChild(cityImg); 

            const { description } = weather[0]; 
            const weatherCon = document.createElement('p'); 
            weatherCon.textContent = description; 
            section.appendChild(weatherCon); 

            const { temp } = main; 
            const current = document.createElement('p'); 
            current.textContent = `Current: ${temp}° F`; 
            section.appendChild(current); 

            const { feels_like } = main; 
            const feelsLike = document.createElement('p'); 
            feelsLike.textContent = `Feels like: ${feels_like}° F`; 
            section.appendChild(feelsLike); 

            // Displaying time of last update using destructured dt property
            const time = new Date(dt * 1000); 
            const timeString = time.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit'
            });
            const updatedParagraph = document.createElement('p');
            updatedParagraph.textContent = `Last updated: ${timeString}`;
            section.appendChild(updatedParagraph);

            // Fetch sunrise and sunset data
            const sunriseSunsetResponse = await fetch(`https://api.sunrise-sunset.org/json?lat=${coord.lat}&lng=${coord.lon}&formatted=0`);
            const sunriseSunsetData = await sunriseSunsetResponse.json();

            // Display sunrise and sunset data
            const { sunrise, sunset } = sunriseSunsetData.results;
            console.log({ sunrise, sunset }); // Logging sunrise and sunset data
            const sunriseTime = new Date(sunrise);
            const sunsetTime = new Date(sunset);
            const sunriseParagraph = document.createElement('p');
            sunriseParagraph.textContent = `Sunrise: ${sunriseTime.toLocaleTimeString()}`;
            section.appendChild(sunriseParagraph);
            const sunsetParagraph = document.createElement('p');
            sunsetParagraph.textContent = `Sunset: ${sunsetTime.toLocaleTimeString()}`;
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
