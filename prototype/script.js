const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherDiv = document.getElementById("weather");
const errorDiv = document.getElementById("error");
const apiKey = "3985522854198e2c83396c278ae6e66e";   

cityInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") 
    searchWeather();
});
searchBtn.addEventListener("click", searchWeather);

async function searchWeather() {
  const city = cityInput.value.trim();

  if (!city) {
    weatherDiv.classList.remove("show");
    errorDiv.textContent = "Please enter a city name";
    return;
  }
  errorDiv.textContent = "";

  weatherDiv.classList.remove("show");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 404){
        throw new Error("City not found");
      }
      throw new Error("Something went wrong");
    }
    const data = await res.json();
    console.log(data); 
    displayWeather(data);
  }
  catch (error) {
    errorDiv.textContent = error.message;
  }
}

function displayWeather(data) {
  document.getElementById("date").textContent = new Date().toLocaleDateString(undefined, {
    day: 'numeric',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
  });
  document.getElementById("city").textContent = data.name + ", "  +  data.sys.country;
  document.getElementById("temp").textContent = Math.round(data.main.temp) + "°C";
  document.getElementById("description").textContent = data.weather[0].description;
  document.getElementById("humidity").textContent = data.main.humidity;
  document.getElementById("pressure").textContent = data.main.pressure;
  document.getElementById("wind").textContent = data.wind.speed;
  const iconCode = data.weather[0].icon;
  document.getElementById("icon").src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  
  weatherDiv.classList.add("show");
}
