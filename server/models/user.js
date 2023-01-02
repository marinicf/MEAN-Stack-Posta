const mongoose = require('mongoose');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

//kako bi varijablu User koristili izvana module.exports
const User = module.exports = mongoose.model('User' , UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id ,callback);
}
module.exports.getUserByUserName = function(username, callback){
    const query = {username:username}
    User.findOne(query ,callback);
}
module.exports.addUser = function(newUser, callback){
    newUser.save(callback);
}
module.exports.comparePassword = function (unseniPassword, password, callback) {
    if(unseniPassword == password){
        callback(null, true);
    }else{
        callback(null, false);
    }
}