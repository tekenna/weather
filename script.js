const btn = document.querySelector(".btn")
const input = document.querySelector(".search")
const place = document.querySelector(".city")
const tempValue = document.querySelector(".temp-value")
const humidityValue= document.querySelector(".humid-value")
const weatherValue = document.querySelector(".weather")
const windSpeed = document.querySelector(".wind-value")

const hrs = document.querySelector(".hr")
const mins = document.querySelector(".min")
const days = document.querySelector(".day")
const dates = document.querySelector(".date")
const mnth = document.querySelector(".month")
const years = document.querySelector(".year")

const months = ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const Week = ["Mon", "Tues", "wed", "Thur", "Fri", "Sat", "Sun"]

let setup = {
    apiKey: "2c522923a9715003754fabf3b48daa09",
    loadWeather: () => {
        let lat = 0, long = 0
        const x = document.querySelector(".weather-content");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(data => {
            lat = data.coords.latitude
            long = data.coords.longitude
            console.log(lat, long);

            fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=57e217af8d0049758546269f43ddd231`)
                .then(res => res.json())
                .then(data => {
                    const city = data.results[0].components.county
                    console.log(city);
                    setup.searchWeather(city)
                })
                .catch(err=> console.log(err))
        }, err => {
            console.log(err);
        })
        } else {
            x.innerHTML = `<span class="error">Please enable your browser to support Geolocation</span>`;
        }
        
    },
    searchWeather : function (city){
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2c522923a9715003754fabf3b48daa09`)
            .then(res => res.json())
            .then(data => {
                const {name}= data
                const {icon, description}= data.weather[0]
                const {temp, humidity}= data.main
                const { speed } = data.wind
                
                place.innerHTML = `in ${name}`
                tempValue.innerHTML = `${temp - 273.15}°C`
                humidityValue.innerHTML = `Humidity : ${humidity}`
                weatherValue.innerHTML = description
                windSpeed.innerHTML = `Wind-speed : ${speed + " "} Km/h`

                console.log(place, tempValue, humidityValue, weatherValue, windSpeed)
            })
            .catch(err=> console.log(err))
    },
    setTime : (hr, min, day, nth, month, year) => {
        hrs.innerHTML = hr
        mins.innerHTML = min < 10 ? `0${min}` : min
        days.innerHTML = Week[day -1] + ","
        dates.innerHTML = `${nth} `
        mnth.innerHTML = months[month -1]
        years.innerHTML = year
    }
        
}
window.addEventListener("load", () => {
    setup.loadWeather()
    console.log("test");
    const date = new Date()
    setInterval(() => {
        const hr = date.getHours()
        const min = date.getMinutes()
        const day = date.getDay()
        const nth = date.getDate()
        const month = date.getMonth()
        const year = date.getFullYear()
        setup.setTime(hr, min, day, nth, month, year)
    }, 1000)
    
})
btn.addEventListener("click", () => {
    setup.searchWeather(input.value)
})
