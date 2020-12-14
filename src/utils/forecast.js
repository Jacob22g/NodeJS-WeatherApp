const request = require('request')

const forecast = (latitude, longitude, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=9d269b223c4ab73b382b640e85f97942&query='+latitude+','+longitude

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('unable to connect to weather service', undefined)
        } else if(body.error){
            callback('unable to find location', undefined)
        } else {
            callback(
                undefined,
                'The weather is ' + body.current.weather_descriptions + '. It is currently ' + body.current.temperature
                + ' degress out. It feels like ' + body.current.feelslike +' degress out.'
                + ' The humidity is ' + body.current.humidity + '%.'
            )
        }
    })
}

module.exports = forecast