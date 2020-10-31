// Package imports
const request = require('request');

// API Token
const apiToken = `pk.eyJ1IjoibWlubTMzMyIsImEiOiJja2dzb3htdmUwMWNmMnJvMDhiYzA5Y2QwIn0.eDM3aZ-fYqeL38yNjpCoKQ`;

// Map box API & Request
const geocode = (location, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        location
    )}.json?access_token=${apiToken}&limit=1`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services');
        } else if (body.features.length === 0 || body.message === 'Not Found') {
            callback('Location not found, plase try another search term');
        } else {
            const geoData = {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name,
            };
            callback(undefined, geoData);
        }
    });
};

// Export
module.exports = geocode;
