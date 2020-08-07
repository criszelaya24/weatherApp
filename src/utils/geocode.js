const request = require('request');

const geocode = (address, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=bd180b1aff6ea40730f7db27dcfd253f&query=${address}`;

    request({ url, json: true }, (error, { body }) => {
        console.log(body);
        
        if (error) return callback('Unable to connect to location services!', {});

        if (!body.location || body.error) return callback('Unable to find location. Try another search.', {});

        return callback(undefined, {
            location: body.location,
            current: body.current,
        });
    });
};

module.exports = geocode;