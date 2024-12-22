const links = document.querySelectorAll('.nav-link');
console.log(links)

for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function (e) {
        e.preventDefault()
        links.forEach(function (link) {
            link.classList.remove('active')
        })
        links[i].classList.add('active');
    })
}




const locationInput = document.getElementById('locationInput')

locationInput.addEventListener('input', function (e) {
    getDataApi(e.target.value)
})



async function getDataApi(cityName) {
    if (cityName.length > 2) {
        let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${cityName}&days=3&key=983d8beab7e844ee86702046242212`)
        let data = await res.json()
        displayData(data)
    }

}
function displayData(data) {
    let dateToday = new Date(data.current.last_updated)
    console.log(dateToday.getDate())
    document.getElementById('dayName').innerHTML = dateToday.toLocaleString('en-us', { weekday: 'long' });
    document.getElementById('dayDate').innerHTML = dateToday.getDate() + ' ' + dateToday.toLocaleString('en-us', { month: 'long' })
    document.getElementById('city').innerHTML = data.location.name;
    document.getElementById('dayTemp').innerHTML = data.current.temp_c;
    document.getElementById('tempIcon').setAttribute('src', `https:${data.current.condition.icon}`)
    document.getElementById('weatherDiscription').innerHTML = data.current.condition.text;
    document.getElementById('umberella').innerHTML = data.current.humidity + '%';
    document.getElementById('wind').innerHTML = data.current.wind_kph + 'km/h';
    document.getElementById('compass').innerHTML = data.current.wind_dir;
    let cartoona = ""
    for (let i = 1; i <= 2; i++) {
        let dateNext = new Date(data.forecast.forecastday[i].date)
        console.log(dateNext)
        cartoona = `<div class="weatherCard ${i == 1 ? 'bg-custom-two' : 'bg-custom'} text-white h-100 ">
                            <div class=" weatherCard-header mb-2">
                                <div id="dayName " class="text-center" >
                                    <p class="m-0">${dateNext.toLocaleString('en-us', { weekday: 'long' })}</p>
                                </div>
                            </div>
                            <div class="weatherCard-body d-flex flex-column justify-content-center align-items-center">
                            <img src="https:${data.forecast.forecastday[i].day.condition.icon}" id="tempIcon" alt="">
                            <div class="tempDeg1">${data.forecast.forecastday[i].day.maxtemp_c}<sup>o</sup>C</div>
                            <div class="tempDeg2">${data.forecast.forecastday[i].day.mintemp_c}<sup>o</sup>C</div>
                            <div class="weatherDiscription">${data.forecast.forecastday[i].day.condition.text}</div>
                        </div>
                    </div>`
        document.querySelectorAll('.card-days')[i - 1].innerHTML = cartoona
    }

}
console.log(document.querySelectorAll('.card-days'))

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (pos) {
        console.log(pos)
        let lat = pos.coords.latitude;
        let lon = pos.coords.longitude;
        getDataApi(`${lat},${lon}`)
    })
}

