const request = require('request')

const forecast = (location, callback) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=7cf46e20baeb89462592c907a9ffb39f&units=metric`
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Unable to connect to Weather Service!")
        } else if (body.message) {
            callback(`${body.message}`)
        } else {
            const main = body.main
            const weather = body.weather[0]
            callback(undefined, {
                location: body.name,
                forecast: `${weather.main} (${weather.description}). It is currently ${main.temp} degrees out. It feels like ${main.feels_like} degrees out. Minimum temperature is ${main.temp_min}, maximum temperature is ${main.temp_max}. Humidity is ${main.humidity}%.`
            })
        }
    })
}

module.exports = forecast