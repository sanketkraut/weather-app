const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')

const app = express()

//set paths
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set hbs engine and views
app.set('view engine', 'hbs')
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

//setup static dir to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sanket Raut'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sanket Raut'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: "Sanket Raut",
        message: 'This is a help message'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "User must provide address"
        })
    }

    forecast(req.query.address, (error, { location, forecast } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        res.send({
            location, forecast
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404 Error",
        errorMessage: "Help article not found",
        name: "Sanket Raut"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404 Error",
        errorMessage: "Page not found",
        name: "Sanket Raut"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})