import apiKey from './keys';

const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
let units;

function appInit() {
  UILogicSetup();
  // getData(defaultURL);
}

appInit();

async function getData(url) {
  try {
    const response = await fetch(url, { mode: 'cors' });
    const weatherData = await response.json();
    console.log(weatherData);
    const processed = processData(weatherData);
    generateWeatherInfoPage(processed);
  } catch (error) {
    console.log(error);
    alert('City not Found :(');
  }
}

function processData(data) {
  const cityName = data.name;
  // eslint-disable-next-line radix
  const tmp = parseInt(data.main.temp);
  // eslint-disable-next-line radix
  const max = parseInt(data.main.temp_max);
  // eslint-disable-next-line radix
  const min = parseInt(data.main.temp_min);
  const weatherDescription = data.weather[0].description;
  const iconURL = data;

  return {
    cityName,
    tmp,
    max,
    min,
    weatherDescription,
  };
}

function UILogicSetup() {
  const btn = document.getElementById('search-btn');
  const input = document.getElementById('search-field');
  btn.addEventListener('click', () => {
    units =
      document.querySelector('.tmp-unit').value === '°F'
        ? 'imperial'
        : 'metric';
    getData(
      `${baseURL}${input.value}&units=${units}&appid=${apiKey.value}`,
    );
    input.value = '';
  });
}

// UI Stuff

function generateWeatherInfoPage(weatherData) {
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Search City';
  input.id = 'search-field';

  const searchBtn = document.createElement('button');
  searchBtn.textContent = 'Search';
  searchBtn.id = 'search-btn';

  const cityNameText = document.createElement('p');
  cityNameText.textContent = weatherData.cityName;
  cityNameText.className = 'name';
  const currentTmpText = document.createElement('p');
  currentTmpText.textContent =
    units === 'metric'
      ? `${weatherData.tmp}°C`
      : `${weatherData.tmp}°F`;
  currentTmpText.className = 'tmp';
  const maxText = document.createElement('p');
  maxText.textContent =
    units === 'metric'
      ? `H:${weatherData.max}°C`
      : `H:${weatherData.max}°F`;
  maxText.className = 'max';
  const minText = document.createElement('p');
  minText.textContent =
    units === 'metric'
      ? `L:${weatherData.min}°C`
      : `L:${weatherData.min}°F`;
  minText.className = 'min';
  const description = document.createElement('p');
  description.className = 'description';
  description.textContent =
    weatherData.weatherDescription.charAt(0).toUpperCase() +
    weatherData.weatherDescription.slice(1).toLowerCase();
  const tmpsBox = document.createElement('div');
  tmpsBox.className = 'tmps-box';

  // Remove current content from the box
  const contentBox = document.querySelector('.content-box');
  while (contentBox.firstChild) {
    contentBox.removeChild(contentBox.lastChild);
  }

  tmpsBox.appendChild(maxText);
  tmpsBox.appendChild(currentTmpText);
  tmpsBox.appendChild(minText);

  const elements = [cityNameText, tmpsBox, description];

  elements.forEach((e) => {
    contentBox.appendChild(e);
  });

  contentBox.style.backgroundColor = 'white';

  // Search Field positioning:

  const searchContainer = document.createElement('div');
  searchContainer.className = 'search-container';
  searchContainer.appendChild(input);
  searchContainer.appendChild(searchBtn);
  searchContainer.style.position = 'absolute';
  searchContainer.style.top = '50px';
  searchContainer.style.width = '70%';

  const container = document.querySelector('.container');
  container.appendChild(searchContainer);

  searchBtn.addEventListener('click', () => {
    getData(
      `${baseURL}${input.value}&units=${units}&appid=${apiKey.value}`,
    );
    container.removeChild(input);
  });
}
