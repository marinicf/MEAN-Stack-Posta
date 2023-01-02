const mongoose = require('mongoose');

const RvUredSchema = mongoose.Schema({
    pu: Number,
    pon_od: String,pon_do: String,
    uto_od: String,uto_do: String,
    sri_od: String,sri_do: String,
    cet_od: String,cet_do: String,
    pet_od: String,pet_do: String,
    sub_od: String,sub_do: String,
    ned_od: String,ned_do: String
});

//model - kada uključimo Ured module u drugi file module fn omogučuje interakciju sa db koristeći Schema
const UredRV = module.exports = mongoose.model('rvuredi' , RvUredSchema);