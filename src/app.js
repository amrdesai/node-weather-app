// Import packages
const path = require('path');
const express = require('express');
const hbs = require('hbs');

// Imported modules
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engione & views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

// Home route
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Aamer',
    });
});

// About Route
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Aamer',
    });
});

// Weather API Route
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({ error: 'Please provide a valid address' });
    } else {
        geocode(req.query.address, (error, geoData = {}) => {
            // check for error
            if (error) {
                res.send({ error });
            } else {
                // Get weather forcast (function call)
                const { location, lat, long } = geoData;
                forecast(lat, long, (error, forecast = {}) => {
                    if (error) {
                        res.send({ error });
                    } else {
                        res.send({
                            location,
                            forecast,
                        });
                    }
                });
            }
        });
    }
});

// 404 Route
app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found',
        title: 404,
        name: 'Aamer',
    });
});

// App working on port
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
