import apiKey from './keys';

const defaultURL = `https://api.openweathermap.org/data/2.5/weather?q=vancouver&units=metric&appid=${apiKey.value}`;
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';

function appInit() {
  UILogicSetup();
  getData(defaultURL);
}

appInit();

async function getData(url) {
  try {
    const response = await fetch(url, { mode: 'cors' });
    const weatherData = await response.json();
    console.log(weatherData);
    processData(weatherData);
  } catch (error) {
    console.log(error);
    alert('City not Found :(');
  }
}

function processData(data) {
  const tmp = data.main.temp;
  const max = data.main.temp_max;
  const min = data.main.temp_min;
  const weatherDescription = data.weather[0].description;

  return {
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
    getData(
      `${baseURL}${input.value}&units=metric&appid=${apiKey.value}`,
    );
    input.value = '';
  });
}
