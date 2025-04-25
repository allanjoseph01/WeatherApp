async function weatherReport() {
    const city = document.getElementById('cit').value.trim();
    if (!city) {
        alert("Please enter a city!");
        return;
    }

    const url = `https://wttr.in/${city}?format=j1`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (!data.nearest_area || data.nearest_area.length === 0) {
            throw new Error("City not found");
        }

        const cityName = data.nearest_area[0].areaName[0].value;
        const country = data.nearest_area[0].country[0].value;

        if (cityName.toLowerCase() !== city.toLowerCase()) {
            throw new Error("City not found");
        }
        console.log(data);
        const currentCondition = data.current_condition[0];
        const weather = data.weather[0];
        const avgTemp = parseFloat(weather.avgtempC).toFixed(1);
        const minTemp = weather.mintempC;
        const maxTemp = weather.maxtempC;
        const windSpeed = currentCondition.windspeedKmph;
        const weatherDesc = currentCondition.weatherDesc[0].value;

        let weatherIcon = "/images/sunny.png";
        if (weatherDesc.includes("Partly sunny") || weatherDesc.includes("Partly cloudy")) {
            weatherIcon = "/images/partly sunnyCloudy.png";
        } else if (weatherDesc.includes("Sunny")) {
            weatherIcon = "/images/sunny.png";
        } else if (weatherDesc.includes("Cloudy")) {
            weatherIcon = "/images/cloudy.png";
        } else if (weatherDesc.includes("Rain") || weatherDesc.includes("Drizzle") || weatherDesc.includes("rain")) {
            weatherIcon = "/images/rainy.png";
        } else if (weatherDesc.includes("Thunder") || weatherDesc.includes("Storm")) {
            weatherIcon = "/images/thunder.png";
        } else if (weatherDesc.includes("snow")) {
            weatherIcon = "/images/snow.png";
        } else if (weatherDesc.includes("Mist")) {
            weatherIcon = "/images/mist.png";
        }

        document.getElementById('output').innerHTML = `
            <h3 id="name">${cityName}, ${country}</h3>
            <span id="desc">${weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1)}</span>
            <div id="big">
                <div id="temperatureDetails">
                    <div id="descIcon">
                        <img src="${weatherIcon}" alt="Weather Icon">
                    </div>
                    <div id="tempDet">
                        <p>Temperature: ${currentCondition.temp_C}°C</p>
                        <p>Average Temperature: ${avgTemp}°C</p>
                        <p>Min Temperature: ${minTemp}°C</p>
                        <p>Max Temperature: ${maxTemp}°C</p>
                    </div>
                </div>
                <div id="windSpeedAndOther">
                    <img src="./public/images/wind 2.png" alt="Wind Icon">
                    <div id="extra">
                        <p>Wind Speed: ${windSpeed} km/h</p>
                        <p>Humidity: ${currentCondition.humidity}%</p>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        document.getElementById('output').innerHTML = `<p class='error'>City not found. Please enter a valid city.</p>`;
    }
}
