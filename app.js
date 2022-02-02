const api = {
    key: 'f177ebac841e5a9816550a746cef614d',
    base: 'https://api.openweathermap.org/data/2.5/'
}

//selectors
const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

//functions
function setQuery(event) { 
    if (event.keyCode === 13) {
        getResults(searchBox.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now)

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<sup>°C</sup>`

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.current .hi-low');
    hilow.innerHTML = `${Math.round(weather.main.temp_max)}<sup>°C</sup> / ${Math.round(weather.main.temp_min)}<sup>°C</sup> `
}

function dateBuilder(d) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month}, ${year}`
}