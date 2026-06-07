const userLocationForm = document.querySelector(`#locationForm`);

const weatherData = {
    async getWeather(location) {
        const data = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=AYC33FCKES87HVPKFNFQYF69V&contentType=json`);
        const locationData = await data.json();
        return locationData;
    },

    async data(location) {
        const data = await this.getWeather(location);

        locationData = {
            description: data.description,
            conditions: data.currentConditions.conditions,
            feelsLike: data.currentConditions.feelslike,
            humidition: data.currentConditions.humidity,
            temp: data.currentConditions.temp,
            windSpeed: data.currentConditions.windspeed
        }

        return locationData;

        // console.log(data.currentConditions)
    }
};

userLocationForm.addEventListener(`submit`, async(e) => {
    e.preventDefault();
    try {
        const data = new FormData(e.target);
        const location = data.get(`userLocation`);
        
        const locationWeather = await weatherData.data(location);

        const LocationName = document.querySelector(`#locationName`);
        LocationName.textContent = location;

        const conditionDescription = document.querySelector(`#conditionDescription`);
        conditionDescription.textContent = `${locationWeather.description}`;

        const currentWeather = document.querySelector(`#currentWeather`);

        const tempDisplay = document.createElement(`p`);
        tempDisplay.textContent = `Temperature: ${locationWeather.temp}°F`;
        currentWeather.appendChild(tempDisplay);

        const feelsLikeDisplay = document.createElement(`p`);
        feelsLikeDisplay.textContent = `Feels Like: ${locationWeather.feelsLike}°F`;
        currentWeather.appendChild(feelsLikeDisplay);

        const conditionDisplay = document.createElement(`p`);
        conditionDisplay.textContent = `Condition: ${locationWeather.conditions}`;
        currentWeather.appendChild(conditionDisplay);

        const humidityDisplay = document.createElement(`p`);
        humidityDisplay.textContent = `Humidity: ${locationWeather.humidity}%`;
        currentWeather.appendChild(humidityDisplay);
        
        const windSpeedDisplay = document.createElement(`p`);
        windSpeedDisplay.textContent = `Wind Speed: ${locationWeather.windSpeed} Kmph`;
        currentWeather.appendChild(windSpeedDisplay);

    } catch {
        const LocationName = document.querySelector(`#locationName`);
        LocationName.textContent = "Location doesn't exist";
    }
})