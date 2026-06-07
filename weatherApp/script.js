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
}






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
    } catch {
        const LocationName = document.querySelector(`#locationName`);
        LocationName.textContent = "Location doesn't exist";
    }
})