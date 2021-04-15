const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');


// get random api quotes
app.get('/api/quotes/random', (req, res, next) => {
    const getRandomQuotes = getRandomElement(quotes);
    res.send({ quote: getRandomQuotes});
});

// get a person
app.get('/api/quotes', (req, res, next) => {
    const {person} = req.query
    const search_author = quotes.filter(author => author.person == person);

    if(search_author != []) {

        // res.json(search_author);

        res.send({quotes: search_author})

    } else {
        res.send({quotes: quotes});
    }
    
});

// post a qoute
app.post('/api/quotes', (req, res, next) => {
    const newQuote = req.query.quote;
    const newPerson = req.query.person;
    if(newQuote != '' && newPerson != '') {
        quotes.push({ quote: newQuote, person: newPerson });
        res.send({quote: {quote: newQuote, person: newPerson }});
    } else {
        res.status(400);
    }
});

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => console.log('server is running on localhost:' + PORT))