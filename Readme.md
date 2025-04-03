## Overview :-
The Weather Forecast App is a simple web application that fetches and displays real-time weather data for any city. Users can enter a city name, and the app will provide details such as temperature, humidity, wind speed, and weather conditions using the 'wttr.in' API.

## Features :- 
1. Fetches real-time weather data for any city.
2. Displays current temperature, average temperature, min/max temperatures.
3. Shows wind speed and humidity.
4. Dynamically updates the UI with weather icons based on conditions.
5. Uses Bootstrap for styling and responsiveness.
6. Utilizes JavaScript to fetch API to get weather data asynchronously.

## Technologies Used :-
1. HTML - For structure of the webpage.
2. CSS & Bootstrap - For styling and layout.
3. JavaScript - For handling the fetching of weather data and dynamically updating the DOM.

#### I have used wttr.in API to retrieve weather data.

## Javascript explanation :-

1. used async function that declares an asynchronous function weatherReport() which will fetch weather data. Here async function ensures that function returns a promise.
2. Retrieves the user-inputted city name from the input field.
3. Checks if the user has entered a city name; if not, it shows an alert and exits the function.
4. Sends an HTTP request to the API and waits for a response.
5. Parses the JSON response from the API.
6. Extracts the information from the data.
7. sets a weather icon according to the weather description.
8. then updates the weather information in the html dynamically using Backtick(`) template literal for dynamic insertion of multiple lines.
9. if the api fails to fetch the data the catch block displays an error message.