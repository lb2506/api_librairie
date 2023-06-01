const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');

const port = 3001;
const cors = require('cors');
const app = express();

app.use(cors());

let libraries = [];

fs.createReadStream('./librairie.csv')
    .pipe(csv({ separator: ';' }))
    .on('data', (row) => {
        libraries.push(row);
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });

app.get('/librairies', (req, res) => {
    res.send(libraries);
});

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});