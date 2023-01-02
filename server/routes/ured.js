//Učitavanje modula
const express = require('express');

//Kreiranje routera
const router = express.Router();

//Model Ured koji se odnosi na kolekciju uredi
const Ured = require('../models/uredi');

//Vrača sve urede 
router.get('/', async (req, res)=>{
    try{
        const uredi = await Ured.find();
        res.json(uredi)
    }catch(err){
        res.json({message: err.message})
    }
})
//Vrača samo jedan ured ovino i ID-u
router.get('/:id', async (req, res)=>{
    const id = req.params.id;
    const query = { pu: id };
    try{
        const uredi = await Ured.findOne(query);
        res.json(uredi)
    }catch(err){
        res.json({message: err.message})
    }
})

module.exports = router;