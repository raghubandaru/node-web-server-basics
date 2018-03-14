const express = require('express');
const fs = require('fs');
const hbs = require('hbs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.path}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (error) => {
        if (error) throw error;
        console.log('Data appended to file');
    });
    next();
});

// app.use((req, res) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('pruthviReddy', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'welcome to pruthvi reddy'
    });
});

app.get('/about', (req, res) =>{
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fetch page'
    });
});

app.listen(3000, () => {
    console.log('Server is up and running');
});

// res.send({
//     name: 'Raghu Bandaru',
//     likes: [
//         'cricket',
//         'tennis'
//     ]
// });