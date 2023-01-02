const express = require('express');
const router = express.Router();

const UredRv = require('../models/rvured');

router.get('/:id', async (req, res)=>{
    const id = req.params.id;
    const query = { pu: id };
    try{
        const ured = await UredRv.findOne(query);
        res.json(ured)
    }catch(err){
        res.json({message: err.message})
    }
})

module.exports = router;