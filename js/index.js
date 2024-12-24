const links= document.querySelectorAll('.nav-link');
for(i=0;i<links.length;i++){
    links[i].addEventListener('click',function(){
        links.forEach(function(link){
            link.classList.remove('active');
        })
        this.classList.add('active');
    })
}


const locationInput =document.getElementById('locationInput');
locationInput.addEventListener('input',function(e){
    getWeather(e.target.value)
})
async function getWeather(cityName) {
    if(cityName.length>2){
        let weatherApi= await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${cityName}&days=3&key=3b88f4ed397244e0a6e131148242412`)
        let weatherData = await weatherApi.json();
        console.log(weatherData);
        disPlay(weatherData);
    }
}
// async function getWeather() {

//         let weatherApi= await fetch(`https://api.weatherapi.com/v1/forecast.json?q=cairo&days=3&key=3b88f4ed397244e0a6e131148242412`)
//         let weatherData = await weatherApi.json();
//         console.log(weatherData);

// }
// getWeather()
// let date= new Date('2024-12-24')
// console.log(date.getDate());
// console.log(date.getMonth()+1);
// console.log(date.getFullYear());

// let dayName=date.toLocaleString('en-us',{weekday:'long'});
// console.log(dayName);
// let dayMonth=date.toLocaleString('en-us',{month:'long'});
// console.log(dayMonth);

function disPlay(weatherData){
    let dateToday=new Date(weatherData.current.last_updated);
    document.getElementById('dayName').innerHTML=dateToday.toLocaleString('en-us',{weekday:'long'});
    document.getElementById('dayDate').innerHTML=dateToday.getDate()+' '+dateToday.toLocaleString('en-us',{month:'long'});
    document.getElementById('city').innerHTML=weatherData.location.name;
    document.getElementById('dayTemp').innerHTML=weatherData.current.temp_c;
    document.getElementById('tempIcon').setAttribute('src',`https:${weatherData.current.condition.icon}`);
    document.getElementById('weatherDiscription').innerHTML=weatherData.current.condition.text;
    document.getElementById('umberella').innerHTML=weatherData.current.humidity+'%';
    document.getElementById('wind').innerHTML=weatherData.current.wind_kph+'km/h';
    document.getElementById('compass').innerHTML=weatherData.current.wind_dir;
    let cartona =" ";
    for (let i = 1; i < weatherData.forecast.forecastday.length; i++) {
    let nextDay=new Date( weatherData.forecast.forecastday[i].date)
    cartona=`
    <div class="weatherCard ${i==1? 'weatherCard-Custom':' ' }   text-white h-100 ">
                            <div class=" weatherCard-header mb-2">
                                <div id="dayName " class="text-center" >
                                    <p class="m-0">${nextDay.toLocaleString('en-us',{weekday:'long'})}</p>
                                </div>
                            </div>
                            <div class="weatherCard-body d-flex flex-column justify-content-center align-items-center">
                            <img src="https:${weatherData.forecast.forecastday[i].day.condition.icon}" id="tempIcon" alt="">
                            <div class="tempDeg1">${weatherData.forecast.forecastday[i].day.maxtemp_c}<sup>o</sup>C</div>
                            <div class="tempDeg2">${weatherData.forecast.forecastday[i].day.mintemp_c}<sup>o</sup>C</div>
                            <div class="weatherDiscription">${weatherData.forecast.forecastday[i].day.condition.text}</div>
                        </div>
                    </div>
    `
document.querySelectorAll('.card-days')[i-1].innerHTML=cartona;
}
}

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        let lat= position.coords.latitude;
        let long= position.coords.longitude;
        getWeather(`${lat},${long}`);
    })
}
