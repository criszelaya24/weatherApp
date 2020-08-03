const request = require('request');

const geocode = (address, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=bd180b1aff6ea40730f7db27dcfd253f&query=${address}`;

    request({ url, json: true }, (error, { body }) => {
        console.log(body);
        
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (!body.location) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                location: body.location,
                current: body.current,
            });
        }
    });
};

module.exports = geocode;