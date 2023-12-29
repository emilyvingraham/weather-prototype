function updateData(response) {
  let temperatureElement = document.querySelector(
    '#search-results-temperature'
  );
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector('#search-results-city');
  let descriptionElement = document.querySelector('#description');
  let longitudeElement = document.querySelector('#longitude');
  let latitudeElement = document.querySelector('#latitude');
  let countryElement = document.querySelector('#country');
  let feelsLikeElement = document.querySelector('#feels-like');
  let humidityElement = document.querySelector('#humidity');
  let windspeedElement = document.querySelector('#windspeed');
  let dateTimeElement = document.querySelector('#date-and-time');
  let date = new Date(response.data.time * 1000);
  let icon = document.querySelector('#icon');
  icon.innerHTML = `<img
      src="${response.data.condition.icon_url}"
      class="search-results-icon"
    />
  `;

  temperatureElement.innerHTML = `${temperature}`;
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  longitudeElement.innerHTML = response.data.coordinates.longitude.toFixed(2);
  latitudeElement.innerHTML = response.data.coordinates.latitude.toFixed(2);
  countryElement.innerHTML = response.data.country;
  feelsLikeElement.innerHTML = Math.round(response.data.temperature.feels_like);
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windspeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  dateTimeElement.innerHTML = formatDate(date);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  } else {
    minutes;
  }
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  } else {
    hours;
  }
  let days = ['Sun.', 'Mon.', 'Tues.', 'Wed.', 'Thurs.', 'Fri.', 'Sat.'];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = '47ce0ocdabaf4a2e81b031bb9t47a0e0';
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateData);
}

function submitSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector('#enter-a-city-input');
  searchCity(searchInput.value);
}

let formElement = document.querySelector('#enter-a-city-form');
formElement.addEventListener('submit', submitSearch);

searchCity('Denver');
