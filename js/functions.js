const url = 'https://api.openweathermap.org/data/2.5/weather';
const icon_url = 'http://openweathermap.org/img/wn/';
const api_key = '03ac8f6fe2b49c6a51d056947d6deaf2';  

const temp_span = document.querySelector('#temp');
const speed_span = document.querySelector('#speed');
const direction_span = document.querySelector('#direction');
const description_span = document.querySelector('#description');
const icon_img = document.querySelector('img');

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude.toFixed(3); //tällä toimii
            const lng = position.coords.longitude.toFixed(3);

            document.querySelector('#lat').innerHTML = lat + ',';
            document.querySelector('#lng').innerHTML = lng;

        
            getWeather(lat, lng);
        }, error => {
            alert(error);
        });
    } else {
        alert("Your browser does not support geolocation!");
    }
};

const getWeather = (lat, lng) => {
    const address = `${url}?lat=${lat}&lon=${lng}&units=metric&appid=${api_key}`; //testi nain


    axios.get(address)
        .then(response => {
            const json = response.data;

        
            temp_span.innerHTML = json.main.temp + '&#8451;'; 
            speed_span.innerHTML = json.wind.speed + ' m/s'; 
            direction_span.innerHTML = json.wind.deg + '&#176;'; 
            description_span.innerHTML = json.weather[0].description; 

          
            const iconCode = json.weather[0].icon;
            icon_img.src = `${icon_url}${iconCode}@2x.png`; 
        })
        .catch(error => {
            alert(error)
        });
};


getLocation();
