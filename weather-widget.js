const WEATHER_API_KEY = 'd578d71ab7906f7fb562960ec95be6b7'; // API key must be in quotes
const DULUTH_COORDS = {
    lat: 46.7867, 
    lon: -92.1005
};

class WeatherWidget {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.init();
    }

    async init() {
        try {
            const weather = await this.fetchWeather();
            this.render(weather);
        } catch (error) {
            console.error('Error fetching weather:', error);
            this.renderError();
        }
    }

    async fetchWeather() {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${DULUTH_COORDS.lat}&lon=${DULUTH_COORDS.lon}&appid=${WEATHER_API_KEY}&units=imperial`
        );
        
        if (!response.ok) {
            throw new Error('Weather data fetch failed');
        }
        
        return await response.json();
    }

    render(weatherData) {
        const temperature = Math.round(weatherData.main.temp);
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        
        this.container.innerHTML = `
            <div class="weather-widget">
                <h3>Current Weather in Duluth</h3>
                <div class="weather-content">
                    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
                    <div class="weather-info">
                        <div class="temperature">${temperature}°F</div>
                        <div class="description">${description}</div>
                    </div>
                </div>
            </div>
        `;
    }

    renderError() {
        this.container.innerHTML = `
            <div class="weather-widget error">
                <p>Unable to load weather data</p>
            </div>
        `;
    }
}

// Initialize the widget when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new WeatherWidget('weather-widget');
});