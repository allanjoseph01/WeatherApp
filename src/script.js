async function weatherReport(){
    const city=document.getElementById('cit').value;
    if(!city){
        alert("Please enter a city!");
        return ;
    }
    const url=`https://wttr.in/${city}?format=j1`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const currentCondition = data.current_condition[0];
        const weather = data.weather[0];
        const cityName = data.nearest_area[0].areaName[0].value;
        const country = data.nearest_area[0].country[0].value;
        const avgTemp = (parseFloat(weather.avgtempC)).toFixed(1);
        const minTemp = weather.mintempC;
        const maxTemp = weather.maxtempC;
        const windSpeed = currentCondition.windspeedKmph;
        const weatherDesc = currentCondition.weatherDesc[0].value;

        let weatherIcon = "./public/images/sunny.png";
        if (weatherDesc.includes("Partly sunny") || weatherDesc.includes("Partly cloudy")) {
            weatherIcon = "./public/images/partly sunnyCloudy.png";
        } else if (weatherDesc.includes("sunny")) {
            weatherIcon = "./public/images/sunny.png";
        } else if (weatherDesc.includes("cloudy")) {
            weatherIcon = "./public/images/cloudy.png";
        } else if (weatherDesc.includes("rain") || weatherDesc.includes("drizzle")) {
            weatherIcon = "./public/images/rainy.png";
        } else if (weatherDesc.includes("thunder") || weatherDesc.includes("storm")) {
            weatherIcon = "./public/images/thunder.png";
        } else if (weatherDesc.includes("snow")) {
            weatherIcon = "./public/images/snow.png";
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
        document.getElementById('output').innerHTML = `<p class='error'>Failed to fetch weather data. please enter a valid city</p>`;
    }
}