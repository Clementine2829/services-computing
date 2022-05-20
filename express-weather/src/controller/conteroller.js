const axios = require("axios")

const API_KEY = "f6dca386947d21dc5c737a1e8c3a282f";

const Weather = require("../model/Weather")

exports.renderHomePage = (req, res) => {
    res.render("index")
}

exports.getWeather = (req, res) => {
    const city = req.body.city

    const lat = -26.204185
    const lon = 28.028724

    //const url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}`
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`

    const weather = new Weather(req.body.city)
    weather.validateUserInput()

    if (weather.errors.length) {
        res.render("index", {
            error: weather.errors.toString()
        })
    } else {
        axios.get(url).then((respose) => {

            const { temp: temperature } = respose.data.main
            const { name: location} = respose.data

            res.render("index", {
                weather: `It is currectly ${temperature} in ${location}`
            })
        }).catch((error) => {
            console.log(error)
        })
    }
}

exports.renderAboutPage = (req, res) => {
    res.render("about")
}