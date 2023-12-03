// Selecting DOM elements
const introPage = document.querySelector(".intro-page");
const weatherPage = document.querySelector(".weather-page");
const fetchBtn = document.getElementById("fetchButton");

// Event listener for the "Fetch Data" button
fetchBtn.addEventListener("click", () => {
  getLocation();
});

// Function to get user's location
const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, handleError);
  }
};

// Error handling function for location retrieval
function handleError() {
  alert("Failed to get Location. Please allow access and try again.");
}

// Function to display user's location and proceed to the weather page
function showPosition(position) {
  // Displaying coordinates on the console
  console.log(position);

  // Hiding the intro page and showing the weather page
  introPage.style.display = "none";
  weatherPage.style.display = "block";

  // Extracting latitude and longitude
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // Displaying latitude and longitude on the page
  document.getElementById("Latitude").innerHTML = `Lat: ${latitude}`;
  document.getElementById("Logitude").innerHTML = `Long: ${longitude}`;

  // Embedding Google Map with the user's location
  document.getElementById(
    "mapFrame"
  ).src = `https://maps.google.com/maps?q=${latitude}, ${longitude}&z=15&output=embed`;

  // Fetching weather data based on coordinates
  fetchWeatherData(latitude, longitude);
}

// Function to fetch weather data from the OpenWeatherMap API
async function fetchWeatherData(latitude, longitude) {
  const apiKey = "e06e8c3b8d58cac4abf9c97d74602c0c";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  try {
    // Making a GET request to the API
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Logging the API response
    console.log(data);

    // Displaying weather data on the UI
    displayWeatherData(data);
  } catch (error) {
    // Handling errors during API request
    console.log("Something went wrong");
  }
}

// Function to display weather data on the UI
function displayWeatherData(data) {
  // Selecting DOM elements for weather information
  const location = document.getElementById("location");
  const windspeed = document.getElementById("windspeed");
  const humidity = document.getElementById("humidity");
  const timeZone = document.getElementById("timeZone");
  const pressure = document.getElementById("pressure");
  const windDirection = document.getElementById("windDirection");
  const uvIndex = document.getElementById("uvIndex");
  const feelsLike = document.getElementById("feelsLike");

  // Displaying weather information on the UI
  location.innerHTML = `Location: ${data.name}`;
  windspeed.innerHTML = `Wind Speed: ${data.wind.speed}kmph`;
  humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
  timeZone.innerHTML = `Time Zone: ${timeZoneConverter(data.timezone)}`;
  pressure.innerHTML = `Pressure: ${hPaToAtm(data.main.pressure)}atm`;
  windDirection.innerHTML = `Wind Direction: ${Direction(data.wind.deg)}`;
  uvIndex.innerHTML = `UV Index: 500`;
  feelsLike.innerHTML = `Feels Like: ${data.main.feels_like}°`;

  // Function to convert API time zone offset to GMT
  function timeZoneConverter(offsetInSeconds) {
    // Convert the offset to hours
    const offsetInHours = offsetInSeconds / 3600;

    // Determine the sign (positive/negative) for formatting
    const sign = offsetInHours >= 0 ? '+' : '-';

    // Extract the hours and minutes
    const hours = Math.abs(Math.floor(offsetInHours));
    const minutes = Math.abs(Math.floor((offsetInHours % 1) * 60));

    // Format the GMT string
    const gmtString = `GMT${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

    return gmtString;
  }

  // Function to convert pressure from hPa to atm
  function hPaToAtm(hPa) {
    return Math.round(hPa / 1013.25);
  }

  // Function to convert wind direction from degrees to compass direction
  function Direction(degree) {
    // ... (your implementation for converting degrees to compass direction)
    if (degree == 0) {
      return "North";
    }
    if (degree == 90) {
      return "East";
    }
    if (degree == 180) {
      return "South";
    }
    if (degree == 270) {
      return "West";
    }
    if (degree > 0 && degree < 90) {
      return "North-East";
    }
    if (degree > 90 && degree < 180) {
      return "South-East";
    }
    if (degree > 180 && degree < 270) {
      return "South-West";
    }
    if (degree > 180 && degree < 360) {
      return "North-West";
    }
  }
}
