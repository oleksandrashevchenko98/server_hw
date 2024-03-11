const express = require('express');
const app = express();
const host = 'localhost';
const port = 8000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use((req, res, next) => {
    const shouldThrowError = Math.random() < 0.1;

    if (shouldThrowError) {
        const delay = Math.floor(Math.random() * 3000) + 1000;
        req.delay = delay;
        setTimeout(() => {
            res.status(500).render('error', { error: 'Simulated 500 Internal Server Error', delay });
        }, delay);
    } else {
        next();
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    const delay = req.delay || 0;
    res.status(500).render('error', { error: err.message, delay });
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server is running at http://${host}:${port}`);
});
