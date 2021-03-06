const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// define paths for Express config
const publidDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publidDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Jacob Graham'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Jacob Graham'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        msg: 'if you need some help contact: Jacob Graham',
        name: 'Jacob Graham'
    })
})



app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address is required'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })    
    })
})



app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMsg: 'Help article not found',
        name: 'Jacob Graham',
        title: '404 Page'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMsg: 'Page not found',
        name: 'Jacob Graham',
        title: '404 Page'
    })
})                 

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})
