const mongoose = require('mongoose');

const UredSchema = mongoose.Schema({
    pu: Number,
    pu_grad: String,
    ulica: String,
    mjesto: String,
    grad: String,
    zupanija: String,
    tel: String,
    fax: String,
    vrsta_pu: String,
    napomena: String,
    ostale_usluge: String,
    lat: Number,
    lng: Number
});

//model - kada uključimo Ured module u drugi file module fn omogučuje interakciju sa db koristeći Schema
const Ured = module.exports = mongoose.model('uredi' , UredSchema);