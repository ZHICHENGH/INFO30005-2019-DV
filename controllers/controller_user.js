var mongoose = require('mongoose');
var  User= mongoose.model('user');

//create a new user
var createuser = function(req,res){
    var user = new User({
        "user_id":req.params.user_id,
        "user_name":req.params.name,
        "passport":req.params.passport,
        "email":req.params.email
    });
    user.save(function(err,newUser){
        if(!err){
            res.send(newUser);
        }else{
            res.sendStatus(400);
        }
    });
};

//get all users
var findAllusers = function(req,res){
    User.find(function(err,user){
        if(!err){
            res.send(user);
        }else{
            res.sendStatus(404);
        }
    });
};

//get one user by id
var findOneuser = function(req,res){
    var userInx = req.params.id;
    User.find({user_id:userInx},function(err,user){
        if(!err){
            res.send(user);
        }else{
            res.sendStatus(404);
        }
    });
};

//get one user by name
var finduserByName = function(req, res){
    var Name = req.params.name;
    User.find({user_name:Name},function(err,user){
        if(!err){
            res.send(user);
        }else{
            res.sendStatus(404);
        }
    });
};

//export functions
module.exports.createuser = createuser;
module.exports.findAllusers = findAllusers;
module.exports.findOneuser = findOneuser;
module.exports.finduserByName = finduserByName;
