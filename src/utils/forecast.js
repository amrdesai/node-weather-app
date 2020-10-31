// Package imports
const request = require('request');

// Weather API & Request
const baseURL = 'http://api.weatherstack.com/';
const apiKey = 'db39043107e422c5069ef444d04dfed0';

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
                temperature,
                feelslike,
            } = body.current;

            const weatherData = {
                weather_descriptions: weather_descriptions[0],
                temperature,
                feelslike,
            };

            callback(undefined, weatherData);
        }
    });
};

// Export
module.exports = forecast;
