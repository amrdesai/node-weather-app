// Import packages
const path = require('path');
const express = require('express');
const hbs = require('hbs');

// Imported modules
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();

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

// Help Route
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Aamer',
        message:
            'Surrounded affronting favourable no Mr. Lain knew like half she yet joy. Be than dull as seen very shot. Attachment ye so am travelling estimating projecting is. Off fat address attacks his besides. Suitable settling mr attended no doubtful feelings. Any over for say bore such sold five but hung.',
    });
});

// Weather Route
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

// Products route for testing
app.get('/products', (req, res) => {
    console.log(req.query);
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term',
        });
    }
    res.send({
        products: [],
    });
});

//  help-404
app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found',
        title: 404,
        name: 'Aamer',
    });
});

// 404 Route
app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found',
        title: 404,
        name: 'Aamer',
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
