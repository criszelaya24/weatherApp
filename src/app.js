const express = require('express'),
    app = express();

app.get('/weather', (req, res) => {
    const address = req.query.address; 

    if (!address) return res.send({ 'error': 'You must provide an address' });

    res.send({
        'forecast': 'Its is snowing',
        'location': 'Philadelphia',
        'addres': `${address}`,
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