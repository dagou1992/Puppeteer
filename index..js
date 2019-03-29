const express = require('express');
const app = express();
const ejs = require('ejs');
const main = require('./puppeteer');

app.set('view engine','ejs');

app.use('/index', (req, res) => res.render('index'));

app.use('/search', async(req, res) => {
    const { value, more } = req.query;
    const list = await main(value, more);
    res.send(list);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));