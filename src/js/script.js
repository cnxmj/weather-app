var lat;
var lon;
var temperature;
const defaultCity = "Bocholt";

document.getElementById('search-btn').addEventListener('click', function() {
    const city = document.getElementById('search-input').value;
    fetchGeoData(city);
})

async function fetchGeoData(city = defaultCity) {   
    const url = `https://nominatim.openstreetmap.org/search?q=${city}&format=json`
    const response = await fetch(url);
    const data = await response.json();    
    lat = data[0].lat;
    lon = data[0].lon;
    
    document.getElementById('city').textContent = data[0].display_name; 
    fetchWeather();
    }

async function fetchWeather() {
    const url = `https://api.brightsky.dev/current_weather?lat=${lat}&lon=${lon}`
    const response = await fetch(url);
    const data = await response.json();    
    temperature = data.weather.temperature;

    const iconClass = getWeatherIcon(data.weather.icon);
    document.getElementById('icon').innerHTML = `<i class="${iconClass}"></i>`;

    document.getElementById('temperature').textContent = temperature;
    document.getElementById('description').textContent = data.weather.icon;
    document.getElementById('date').textContent = formatDate(data.weather.timestamp);
    document.getElementById('wind').textContent = data.weather.wind_speed_60;
    document.getElementById('humidity').textContent = data.weather.relative_humidity;
    document.getElementById('pressure').textContent = data.weather.pressure_msl;
    document.getElementById('cloud-cover').textContent = data.weather.cloud_cover;
    document.getElementById('condition').textContent = data.weather.condition;
    document.getElementById('sunshine').textContent = data.weather.sunshine_30;
    }

fetchGeoData();

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('en-uk', options);
}

function getWeatherIcon(iconAlias) {
    const iconMap = {
        'clear-day': 'fas fa-sun',
        'clear-night': 'fas fa-moon',
        'partly-cloudy-day': 'fas fa-cloud-sun',
        'partly-cloudy-night': 'fas fa-cloud-moon',
        'cloudy': 'fas fa-cloud',
        'fog': 'fas fa-smog',
        'wind': 'fas fa-wind',
        'rain': 'fas fa-cloud-rain',
        'sleet': 'fas fa-cloud-meatball',
        'snow': 'fas fa-snowflake',
        'hail': 'fas fa-icicles',
        'thunderstorm': 'fas fa-bolt'
    };

    return iconMap[iconAlias] || 'fas fa-question';
}

