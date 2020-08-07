const geocode = require('./utils/geocode');
const express = require('express'),
    app = express(),
    hbs = require('hbs'),
    path = require('path');

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Static views

app.get('/', (req, res) => {
    res.render('index', {
        title: 'WeatherApp',
        name: 'Cristopher Palacios',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Cristopher Palacios',
    });
});

// API view

app.get('/weather', (req, res) => {
    const address = req.query.address; 

    if (!address) return res.send({ 'error': 'You must provide an address' });

    geocode(address, (err, { location, current }) => {
        if (err) return res.send({ 'error': `${err}` });

        res.send({
            'forecast': current.weather_descriptions.join(', '),
            'location': location.name,
            'address': location.region,
        });
    });
});

app.all('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Cristopher Palacios',
        errorMessage: 'Page not found.',
    });
});

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});