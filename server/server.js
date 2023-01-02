//Učitavanje Express ovisnosti 
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');
const bodyPasere = require('body-parser');
const passport = require('passport')
const session = require('express-session')

//Povezivanje na bazu
mongoose.connect(config.database)

//Povezano 
mongoose.connection.on('connected', () =>{
    console.log('Connected to MondoDB');
});

//Inicijalizacija Express-a
const app = express();

//Učitavanje router-a
const users = require('./routes/users')
const uredi = require('./routes/ured')
const uredirv = require('./routes/uredrv')

//Borj porta
const port = 3001;

//CORS Middleware
app.use(cors());

//Body-parese Middleware
app.use(bodyPasere.json());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'yoursecret' 
  }));

app.use(passport.initialize());
app.use(passport.session());

//Učitavanje modula passport i njegova inicijalizacija
require('./config/passport')(passport);

//Preusmjerava zahjeve na određeni router ovisno o smjeru
app.use('/users', users);
app.use('/uredi', uredi);
app.use('/uredrv', uredirv);

//Deklaracija prve Express rute, API endpoint.
app.get('/', (req, res) =>{
    res.send(`Server runing on port ${port}`)
});

//Pokretanje servera koji počinje slušati na portu koji mu je dodijeljen 
app.listen(port, () => {
    console.log(`Server runing on port ${port}`);
});