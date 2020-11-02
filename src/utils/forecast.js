// Package imports
const request = require('request');

// Weather API & Request
const baseURL = 'http://api.weatherstack.com/';
const apiKey = 'db39043107e422c5069ef444d04dfed0';

// Test url: http://api.weatherstack.com/current?access_key=db39043107e422c5069ef444d04dfed0&query=hyderabad&units=f

// // Weather API & Request
const forecast = (lat, long, callback) => {
    const url = `${baseURL}current?access_key=${apiKey}&query=${lat},${long}&units=f`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback(error);
        } else if (body.error) {
            callback('Unable to find location, try different location');
        } else {
            const {
                weather_descriptions,
                weather_icons,
                temperature,
                feelslike,
                humidity,
                visibility,
                is_day,
            } = body.current;

            const weatherData = {
                weather_descriptions: weather_descriptions[0],
                weather_icons: weather_icons[0],
                temperature,
                feelslike,
                humidity,
                visibility,
                is_day,
            };

            callback(undefined, weatherData);
        }
    });
};

// Export
module.exports = forecast;
