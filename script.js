const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

// Hide all elements initially
function hideAllElements() {
    weatherBox.style.display = 'none';
    weatherDetails.style.display = 'none';
    error404.style.display = 'none';
    weatherBox.classList.remove('active');
    weatherDetails.classList.remove('active');
    error404.classList.remove('active');
    container.style.height = '105px';
}

// Initial hide
hideAllElements();

search.addEventListener('click', () => {
    const APIKey = '064b2b104e2102cf49505fda4026eb9b';
    const city = document.querySelector('.search-box input').value.trim();
    
    if (city === '') {
        return;
    }

    hideAllElements();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(json => {
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch(json.weather[0].main) {
                case 'Clear':
                    image.src = 'clear.png';
                    break;
                case 'Rain':
                    image.src = 'rain.png';
                    break;
                case 'Snow':
                    image.src = 'snow.png';
                    break;
                case 'Clouds':
                    image.src = 'cloud.png';
                    break;
                case 'Mist':
                case 'Haze':
                    image.src = 'mist.png';
                    break;
                default:
                    image.src = 'cloud.png';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            // Show weather info
            container.style.height = '555px';
            weatherBox.style.display = 'block';
            weatherDetails.style.display = 'flex';
            
            setTimeout(() => {
                weatherBox.classList.add('active');
                weatherDetails.classList.add('active');
            }, 10);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            container.style.height = '400px';
            error404.style.display = 'block';
            setTimeout(() => {
                error404.classList.add('active');
            }, 10);
        });
});

// Add keyboard support for search
document.querySelector('.search-box input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        search.click();
    }
});
