const geocode = require('./utils/geocode');
const express = require('express'),
    app = express();

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
    res.send({
        data: 'Endpoint does not exist',
    });
});

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});