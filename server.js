const express = require('express');
const app = express();
port = 3001;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    // res.send('Hello World!');
    res.render('index.ejs');
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});